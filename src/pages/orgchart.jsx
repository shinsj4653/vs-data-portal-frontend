import React from 'react';
import DataDrivenOrgChart from '../components/orgchart/dataDrivenOrgChart';
import Layout from '../components/layout';
import vs_data from '../vs_dataset.json';

const Orgchart = () => {
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
				<div className="flex">
					{/* <Sidebar /> */}
					<DataDrivenOrgChart data={vs_data} />
				</div>
			</Layout>
		</>
	);
};

export default Orgchart;
