import React, { useState, useEffect } from 'react';
import DataDrivenOrgChart from '../components/orgchart/dataDrivenOrgChart';
import Layout from '../components/layout';
import { useOrgChartMain } from '../hooks/useOrgChart';
// import MainSearchBar from '../components/main/mainSearchBar';
import Loading from '../components/loading';
import Sidebar from '../components/orgchart/sidebar';


const Orgchart = () => {
	const orgChartData = useOrgChartMain();
	const [activeTarget, setActiveTarget] = useState("");

	if (orgChartData.isLoading) {
		return <Loading></Loading>;
	}

	const data = orgChartData.data.data;

	const handleTargetSelect = async (targetName) => {
		setActiveTarget({ targetName });
	};
			
	return (
		<>
			<Layout>
				<div className="hero min-h-16 flex flex-col bg-[#69676A]">
					<div className="hero-overlay bg-[#69676A] bg-opacity-70"></div>
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
					<div className='hero h-16 relative items-center'>
						<div className="absolute w-full h-full bg-[#69676A]"></div>
						<div className="absolute w-3/4 h-full bg-white"></div>
					</div>
				</div>
				<div className="relative flex flex-row justify-center items-top mx-auto w-3/4 h-screen bg-white">
					<Sidebar onTargetSelect={handleTargetSelect}/>
					<div className="flex flex-col w-full h-full bg-white flex relative z-10">
						<div>
							<p className="flex ml-16 text-black font-extrabold text-2xl h-full mb-6">
								조직도
							</p>
						</div>
						<div><hr className="bg-black mr-16 ml-16 border border-black"></hr></div>
						<div className='w-full h-full'>
							<DataDrivenOrgChart data={data} activeTarget={activeTarget} />
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Orgchart;
