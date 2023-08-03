import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '../components/dataMap/sidebar';
import vs_data from '../vs_dataset.json';
import DataMapChart from '../components/dataMap/dataMapChart';
import Layout from '../components/layout';
import circlepack_background from '../assets/backgrounds/circlePack_background.jpg';
import {
	useDataMapAllDataset,
	useDataMapMain,
	useDataMapSub,
} from '../hooks/useDataMap';

const colors = ['#A8D8EA', '#AA96DA', '#FCBAD3', '#FFFFD2'];
// json Data에 Depth 속성 추가
const transformData = (data, depth = 0) => {
	if (data.children) {
		return {
			...data,
			depth,
			color: colors[depth % colors.length], // depth를 colors 배열의 인덱스로 사용하여 색상 할당
			children: data.children.map((child) => transformData(child, depth + 1)),
		};
	}
	return {
		...data,
		depth,
		color: colors[depth % colors.length], // depth를 colors 배열의 인덱스로 사용하여 색상 할당
	};
};

// 전체 브랜드 Dataset을 보여주기 위한 Circle Pack 컴포넌트
const DataMap = () => {
	const [clickedNodeId, setClickedNodeId] = useState(null);
	const [filterCategory, setFilterCategory] = useState(true);
	const [data, setData] = useState(null);
	const [originData, setOriginData] = useState(null);
	const [dataSet, setDataSet] = useState(null);
	const [activeButton, setActiveButton] = useState('');

	const mainDataQuery = useDataMapMain();
	const subDataQuery = useDataMapSub();
	const dataMapDatasetQuery = useDataMapAllDataset();

	// useEffect를 사용하여 데이터를 동기적으로 처리
	useEffect(() => {
		const fetchData = async () => {
			// 여기서 사용할 API 호출들을 배열로 묶어서 Promise.all로 처리
			const [mainData, subData, dataMapDataset] = await Promise.all([
				mainDataQuery.refetch(),
				subDataQuery.refetch(),
				dataMapDatasetQuery.refetch(),
			]);

			// 각 API 호출이 성공하면 데이터 처리
			if (mainData && subData && dataMapDataset) {
				const datasets = dataMapDataset.data.data;
				const result = filterCategory ? mainData.data.data : subData.data.data;
				const transformedData = transformData(result);
				setOriginData(transformedData);
				setData(transformedData);
				setDataSet(datasets);
			}
		};

		fetchData();
	}, [filterCategory]);

	const handleChange = () => {
		setFilterCategory((prevFilterCategory) => !prevFilterCategory);
		setActiveButton('');
	};

	const handleNodeClick = (nodeId) => {
		setClickedNodeId(nodeId);
	};

	const handleDatasetColorChange = (name, color) => {
		setActiveButton(name);

		const tempData = JSON.parse(JSON.stringify(originData));

		const findAndChangeColor = (data) => {
			if (data.name === name) {
				data.color = color;
			} else if (data.children) {
				data.children.forEach((child) => findAndChangeColor(child));
			}
		};

		findAndChangeColor(tempData);

		setData({ ...tempData }); // 이제 modifiedData도 필요하지 않습니다.
	};

	if (!data) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Layout>
				<div
					className="hero min-h-16"
					style={{
						backgroundImage: `url(${circlepack_background})`,
					}}
				>
					<div className="hero-overlay bg-primary-content bg-opacity-70"></div>
					<div className="hero-content text-center text-neutral-100">
						<div className="">
							<h1 className="my-5 text-5xl font-bold">비상교육 데이터 맵</h1>
							<p className="mb-5">
								비상교육의 전체 브랜드의 데이터를 한눈에 볼 수 있는
								서비스입니다.
							</p>
						</div>
					</div>
				</div>

				<div className="flex">
					<Sidebar
						data={data}
						onNodeClick={handleNodeClick}
					/>
					<div>
						<div className="flex flex-row items-center">
							<div className="flex justify-center p-5">
								<div className="flex bg-slate-400 rounded-2xl p-3">
									{dataSet.map((child, idx) => (
										idx < 7 &&
										<button
											className={`${
												activeButton === child ? 'bg-red-400' : 'bg-white'
											}  rounded-lg shadow-md m-2 px-4 py-2 hover:bg-slate-200`}
											key={child}
											onClick={() => {
												handleDatasetColorChange(child, '#F87171');
											}}
										>
											#{child}
										</button>
									))}
								</div>
							</div>
							<div className="form-control">
								<label className="label cursor-pointer">
									<span className="label-text font-bold pr-3 text-xl">
										{filterCategory ? '대분류' : '중분류'}
									</span>
									<input
										id="filterCategory"
										type="checkbox"
										className="toggle toggle-lg"
										checked={filterCategory} // 상태와 체크 여부를 연결
										onChange={handleChange} // 체크박스 상태 변경 이벤트 처리
									/>
								</label>
							</div>
						</div>
						<DataMapChart
							data={data}
							clickedNodeId={clickedNodeId}
							onNodeClick={handleNodeClick}
						/>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default DataMap;
