import React, { useState } from 'react';
import DataDrivenOrgChart from '../components/orgchart/dataDrivenOrgChart';
import Layout from '../components/layout';
import { useOrgChartMain } from '../hooks/useOrgChart';
import MainSearchBar from '../components/main/mainSearchBar';
import Loading from '../components/loading';

const Orgchart = () => {
	const orgChartData = useOrgChartMain();
	const [activeTarget, setActiveTarget] = useState('');
	const [targetList, setTargetList] = useState(["유아", "초등", "중고등", "성인", "글로벌"]);

	if (orgChartData.isLoading) {
		return <Loading></Loading>;
	}

	const data = orgChartData.data.data;

	const handleServiceTargetColorChange = (name, color) => {
		setActiveTarget(name);

		// const tempData = JSON.parse(JSON.stringify(originData));

		// const findAndChangeColor = (data) => {
		// 	if (data.name === name) {
		// 		data.color = color;
		// 	} else if (data.children) {
		// 		data.children.forEach((child) => findAndChangeColor(child));
		// 	}
		// };

		// findAndChangeColor(tempData);

		// setData({ ...tempData }); // 이제 modifiedData도 필요하지 않습니다.
	};

	return (
		<>
			<Layout>
				<div
					className="hero min-h-16"
					// style={{
					// 	backgroundImage: `url(${circlepack_background})`,
					// }}
				>
					<div className="hero-overlay bg-primary-content bg-opacity-70"></div>
					<div className="hero-content text-center text-neutral-100">
						<div className="">
							<h1 className="my-5 text-5xl font-bold">
								비상교육 데이터 조직도
							</h1>
							<p className="mb-5">
								데이터 기반 조직도를 볼 수 있는 서비스입니다.
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center bg-slate-100 p-5">
					{/* <Sidebar /> */}
					<div className='bg-slate-200 p-5 rounded-lg shadow-md items-center mb-1'>
						<p className='pb-3'>DataSet 검색하기</p>
						<MainSearchBar />
						
					</div>
					{/* <div className="flex justify-center p-5">
								<div className="flex bg-slate-400 rounded-2xl p-3">
									{targetList.map((child) => (
										<button
											className={`${
												activeTarget === child ? 'bg-red-400' : 'bg-white'
											}  rounded-lg shadow-md m-2 px-4 py-2 hover:bg-slate-200`}
											key={child}
											onClick={() => {
												handleServiceTargetColorChange(child, '#F87171');
											}}
										>
											#{child}
										</button>
									))}
								</div>
							</div> */}
					<DataDrivenOrgChart data={data} />
				</div>
			</Layout>
		</>
	);
};

export default Orgchart;
