import React, { useLayoutEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { OrgChart } from 'd3-org-chart';
import CustomNodeContent from './customNodeContent';
import CustomExpandButton from './customExpandedButton';

const transformData = (data, depth = 0) => {
	const transformedData = [];

	const traverse = (node, parentId, currentDepth) => {
		if (currentDepth > depth) {
			return;
		}

		const transformedNode = {
			id: node.id.replace('node-', ''),
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
	const d3Container = useRef(null);
	const data = transformData(props.data, 2);
	let chart = null;

	useLayoutEffect(() => {
		if (!chart) {
			chart = new OrgChart();
		}
		if (props.data && d3Container.current) {
			chart						
				.container(d3Container.current)							
				.data(data)
				.nodeWidth((d) => 330)
				.nodeHeight((d) => 150)
				.compactMarginBetween((d) => 80)
				.compact(0)
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
				
				.render();
		}

		chart.getChartState().svg.on("wheel.zoom", null);		
	}, [props, props.data]);

	return (
		<div
			className="bg-slate-100 w-full"
			ref={d3Container}
		>
			<button
				onClick={() => {
					chart.zoomOut();
				}}
				className="btn btn-action-button waves-effect waves-light"
			>
				<i className="fas fa-minus"></i> zoom out
			</button>
			<br />
			<button
				onClick={() => {
					chart.zoomIn();
				}}
				className="btn btn-action-button waves-effect waves-light"
			>
				<i className="fas fa-plus"></i> zoom in
			</button>
		</div>
	);
};

export default DataDrivenOrgChart;
