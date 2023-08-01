import React from 'react';
import DataDrivenOrgChart from '../components/orgchart/dataDrivenOrgChart';
import Layout from '../components/layout';
import { useOrgChartMain } from '../hooks/useOrgChart';
import MainSearchBar from '../components/main/mainSearchBar';

const Orgchart = () => {
	const orgChartData = useOrgChartMain();

	if (orgChartData.isLoading) {
		return <div>Loading...</div>;
	}

	const data = orgChartData.data.data;

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
					<DataDrivenOrgChart data={data} />
				</div>
			</Layout>
		</>
	);
};

export default Orgchart;
