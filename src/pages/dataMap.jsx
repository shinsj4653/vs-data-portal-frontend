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
import Loading from '../components/loading';

const colors = ['#A8D8EA', '#AA96DA', '#FCBAD3', '#FFFFD2'];
// json Data에 Depth 속성 추가
const transformData = (data, depth = 0, parentList) => {
	if (data.children) {
		return {
			...data,
			depth,
			parentList: parentList,
			color: colors[depth % colors.length], // depth를 colors 배열의 인덱스로 사용하여 색상 할당
			children: data.children.map((child) => transformData(child, depth + 1, parentList.concat(data.name))),
		};
	}
	return {
		...data,
		depth,
		parentList: parentList,
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
				const transformedData = transformData(result, 0, []);
				console.log(transformedData);
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
		return <Loading></Loading>;
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
						isMap={true}
					/>
					<div>
						<div className='flex flex-col'>

							<div className="flex flex-row bg-white rounded-2xl pt-5">
								<div className="flex justify-center items-center w-1/6 pt-1">
									<p className="text-center text-gray-400 font-extrabold text-lg">주요 데이터셋</p>
								</div>
								<div className="flex w-2/3">
									<div className='flex flex-row overflow-x-auto scroll-smooth'>
										{dataSet.map((child, idx) => (
											idx < 7 &&
											<button
												className={`${
													activeButton === child ? 'bg-white text-blue border border-[#0091FA] text-[#0091FA]' : 'bg-white border-[#C0C0C0] text-[#C0C0C0]'
												} shadow-md m-2 px-4 hover:bg-slate-100 border font-bold min-w-[9rem] flex-shrink-0 overflow-wrap break-word min-h-[3rem]`}
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

								<div className="form-control items-center w-1/6  pt-3">
									<label className="label cursor-pointer">
										<span className="text-center text-[#0091FA] font-extrabold text-lg label-text pr-10">
											{filterCategory ? '대분류' : '중분류'}
										</span>
										<input
											id="filterCategory"
											type="checkbox"
											className="toggle toggle-lg bg-[#0091FA] border border-[#0091FA]"
											checked={filterCategory} // 상태와 체크 여부를 연결
											onChange={handleChange} // 체크박스 상태 변경 이벤트 처리
										/>
									</label>
								</div>

							</div>
							<div><hr className="mt-5 h-[1px] bg-[#E5E7EB]"></hr></div>
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
