import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '../components/dataMap/sidebar';
import Layout from '../components/layout';

// 전체 브랜드 Dataset을 보여주기 위한 Circle Pack 컴포넌트
const AiStatusMap = () => {
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
							<h1 className="my-5 text-5xl font-bold">비상교육 AI 현황맵</h1>
							<p className="mb-5">
								비상교육의 AI 기술사용 현황을 맵 형태로 볼 수 있는 서비스입니다.
							</p>
						</div>
					</div>
				</div>

				<div className="flex justify-center h-screen">
					<iframe className="w-full" height="h-full" onfocus="true" src="https://app.powerbi.com/reportEmbed?reportId=3d2d9579-060b-4d9b-b81d-bfa0577dd62a&autoAuth=true&ctid=f2d1b529-a719-4ee5-9b25-d772ec2b0db5" frameborder="0" allowFullScreen="true"></iframe>
				</div>
			</Layout>
		</>
	);
};

export default AiStatusMap;
