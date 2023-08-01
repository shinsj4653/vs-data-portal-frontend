import React, { useLayoutEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { OrgChart } from 'd3-org-chart';
import CustomNodeContent from './customNodeContent';
import CustomExpandButton from './customExpandedButton';
import { GoZoomIn, GoZoomOut } from 'react-icons/go';
import ServiceDetailsCard from './serviceDetailsCard';

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
						<CustomNodeContent {...d} />
					);
				})
				.onNodeClick((d) => {
					toggleDetailsCard(d);
				})
				.render()
				.fit();
		}

		chart.getChartState().svg.on('wheel.zoom', null);
	}, []);

	return (
		<>
			<div
				className="bg-slate-100 w-full relative"
				ref={d3Container}
			>
				{cardShow && <ServiceDetailsCard handleClose={handleClose} />}
				{/* <div className="absolute top-0 left-0 flex flex-row">
				<button
					onClick={() => {
						chart.zoomOut();
					}}
					className="btn btn-action-button waves-effect waves-light"
				>
					<GoZoomOut /> zoom out
				</button>
				<br />
				<button
					onClick={() => {
						chart.zoomIn();
					}}
					className="btn btn-action-button waves-effect waves-light"
				>
					<GoZoomIn /> zoom in
				</button>
			</div> */}
			</div>
		</>
	);
};

export default DataDrivenOrgChart;
