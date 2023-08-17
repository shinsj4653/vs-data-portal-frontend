import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { OrgChart } from 'd3-org-chart';
import CustomNodeContent from './customNodeContent';
import CustomExpandButton from './customExpandedButton';
import { GoZoomIn, GoZoomOut } from 'react-icons/go';
import ServiceDetailsCard from './serviceDetailsCard';
import { useServiceByTarget } from '../../hooks/useOrgChart';

const transformData = (data, depth = 0) => {
	const transformedData = [];

	const traverse = (node, parentId, currentDepth) => {
		if (currentDepth > depth) {
			return;
		}

		const transformedNode = {
			id: node.id,
			parentId,
			name: node.name,
			color: node.color,
		};

		transformedData.push(transformedNode);

		if (node.children && node.children.length > 0) {
			node.children.forEach((child) => {
				traverse(child, transformedNode.id, currentDepth + 1);
			});
		}
	};

	traverse(data, '', 0);

	return transformedData;
};

const DataDrivenOrgChart = (props) => {
	const [target, setTarget] = useState(props.activeTarget?.targetName || "");

	useEffect(() => {
	// 타겟명 변경될 때
	  if (JSON.stringify(target) !== JSON.stringify(props.activeTarget.targetName)) {
		setTarget(props.activeTarget.targetName);
	  }
	}, [props.activeTarget.targetName, target]);
			
	// console.log(target);

	const serviceByTargetDataQuery = useServiceByTarget(target);
	const [servicesByTarget, setServicesByTarget] = useState([]);

	useEffect(() => {
		// 서비스 데이터가 로드될 때만 실행
		if (serviceByTargetDataQuery.data) {
			setServicesByTarget(serviceByTargetDataQuery.data.data);
		}
	}, [serviceByTargetDataQuery.data]);

	const [cardShow, setCardShow] = useState(false);
	const d3Container = useRef(null);

	const data = transformData(props.data, 2);
	
	data.forEach((d) => (d._expanded = true));

	const handleShow = (nodeId) => {
		console.log(nodeId);
		setCardShow(true);
	};
	
	const handleClose = () => setCardShow(false);

	let chart = new OrgChart();	

	useLayoutEffect(() => {
		const toggleDetailsCard = (nodeId) => {
			handleShow(nodeId);
		};
		// console.log("custom service : ", servicesByTarget);

		if (data && d3Container.current) {
			chart
				.container(d3Container.current)
				.data(data)
				.nodeWidth((d) => 250)
				.nodeHeight((d) => 150)
				.compactMarginBetween((d) => 80)
				.buttonContent((node, state) => {
					return ReactDOMServer.renderToStaticMarkup(
						<CustomExpandButton {...node.node} />
					);
				})
				.nodeContent((d) => {
					return ReactDOMServer.renderToStaticMarkup(
						<>
						<CustomNodeContent
							{...d}
							servicesByTarget={servicesByTarget}
						/>
						</>
					);
				})
				.onNodeClick((d) => {
					toggleDetailsCard(d);
				})
				.render()
				.fit();
		}

		chart.getChartState().svg.on('wheel.zoom', null);
	  
	}, [servicesByTarget]);

	return (
		<>
			<div
				className="bg-white w-full"
				ref={d3Container}
			>
				{cardShow && <ServiceDetailsCard handleClose={handleClose} />}
			</div>
		</>
	);
};

export default DataDrivenOrgChart;
