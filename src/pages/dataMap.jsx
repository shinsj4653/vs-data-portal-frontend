import React, { useState } from 'react';
import Sidebar from '../components/dataMap/sidebar';
import vs_data from '../vs_dataset.json';
import DataMapChart from '../components/dataMap/dataMapChart';
import Layout from '../components/layout';
import circlepack_background from '../assets/backgrounds/circlePack_background.jpg';
import { useDataMapMain, useDataMapSub } from '../hooks/useDataMap';

// 전체 브랜드 Dataset을 보여주기 위한 Circle Pack 컴포넌트
const DataMap = () => {
	const [clickedNodeId, setClickedNodeId] = useState(null);
	const [filterCategory, setFilterCategory] = useState(true);
	const mainData = useDataMapMain();
	const subData = useDataMapSub();

  if (mainData.isLoading || subData.isLoading) {
    return <div>Loading...</div>;
  }

	const data = filterCategory ? JSON.parse(mainData.data.data) : JSON.parse(subData.data.data);

	const handleChange = () => {
		setFilterCategory(!filterCategory); // 상태를 반전시켜 체크 여부 변경
	};

	const handleNodeClick = (nodeId) => {
		setClickedNodeId(nodeId);
	};

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
        {/* <div className='flex justify-center p-5'>
          <div className='flex bg-slate-400 rounded-2xl w-min p-3'>
            <button className='bg-white rounded-lg shadow-md px-4 py-2 hover:bg-slate-200'>#test</button>
          </div>
        </div> */}
				<div className="flex">
					<Sidebar
						data={data}
						onNodeClick={handleNodeClick}
					/>
					<DataMapChart
						data={data}
						clickedNodeId={clickedNodeId}
						onNodeClick={handleNodeClick}
					/>
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
			</Layout>
		</>
	);
};

export default DataMap;
