import React from 'react';
import MainSearchBar from './mainSearchBar';
import data_platform_img_light from '../../assets/backgrounds/data_platform_img_light.jpg';
import lecture_icon from '../../assets/icons/lecture_icon.png';
import brand_icon from '../../assets/icons/brand_icon.png';
import org_icon from '../../assets/icons/org_icon.png';
import data_icon from '../../assets/icons/data_icon.png';
import system_info_icon from '../../assets/icons/system_info_icon.png';
import data_analytics_icon from '../../assets/icons/data_analytics_icon.png';
import { Link } from 'react-router-dom';

const DataPlatformMain = () => {
	return (
		<>
			<section>
				<div
					className="hero min-h-16"
					style={{
						backgroundImage: `url(${data_platform_img_light})`,
					}}
				>
					<div className="hero-overlay bg-primary-content bg-opacity-70"></div>
					<div className="hero-content text-center text-neutral-100">
						<div className="">
							<h1 className="my-5 text-5xl font-bold">
								비상교육 데이터 서비스
							</h1>
							<p className="mb-5">
								Data Platform Cell에서 제공하는 <br />
								비상교육 통합 데이터 서비스 입니다.
							</p>
							<MainSearchBar />
						</div>
					</div>
				</div>
				<div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 bg-sky-100">
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-3 bg-sky-200 p-3 rounded-2xl justify- auto-cols-max">
						<Link
							className="card"
							to="/DataMap"
						>
							<div className="card border-2 border-slate-600 bg-base-100 shadow-xl transition duration-150 ease-out hover:bg-slate-200">
								<figure className="px-10 pt-10">
									<img
										src={brand_icon}
										alt="brand_icon"
										className="h-20"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">비상교육 데이터 맵</h2>
									{/* <p>버블차트를 통해 비상의 전체 브랜드를 볼 수 있는 서비스</p> */}
								</div>
							</div>
						</Link>

						<Link
							className="card"
							to="/Orgchart"
						>
							<div className="card border-2 border-slate-600 bg-base-100 shadow-xl transition duration-150 ease-out hover:bg-slate-200">
								<figure className="px-10 pt-10">
									<img
										src={org_icon}
										alt="lecture"
										className="h-20"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">데이터 기반 조직도</h2>
									{/* <p>데이터 기반으로 조직도를 볼 수 있는 서비스</p> */}
								</div>
							</div>
						</Link>

						<div>
							<div className="card border-2 border-slate-600 bg-base-100 shadow-xl transition duration-150 ease-out hover:bg-slate-200">
								<figure className="px-10 pt-10">
									<img
										src={lecture_icon}
										alt="lecture"
										className="h-20"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">
										AI 현황맵 (개발 예정)
									</h2>
									{/* <p>비상교육의 학(學),습(習) 데이터를 볼 수 있는 서비스</p> */}
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-3 my-4 bg-indigo-100 p-3 rounded-2xl justify-between">
						<div
							className="card"
							to="/MetaDataInfo">
							<div className="card border-2 border-slate-600 bg-base-100 shadow-xl transition duration-150 ease-out hover:bg-slate-200">
								<figure className="px-10 pt-10">
									<img
										src={data_icon}
										alt="lecture"
										className="h-20"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">메타데이터 정보</h2>
									{/* <p>
                    데이터셋, 데이터 사전, 테이블 목록 등 메타정보를 볼 수 있는
                    서비스
                  </p> */}
								</div>
							</div>
						</div>

						<div className="card">
							<div className="card border-2 border-slate-600 bg-base-100 shadow-xl transition duration-150 ease-out hover:bg-slate-200">
								<figure className="px-10 pt-10">
									<img
										src={system_info_icon}
										alt="lecture"
										className="h-20"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">시스템정보 (개발 예정)</h2>
								</div>
							</div>
						</div>

						<div className="card">
							<div className="card border-2 border-slate-600 bg-base-100 shadow-xl transition duration-150 ease-out hover:bg-slate-200">
								<figure className="px-10 pt-10">
									<img
										src={data_analytics_icon}
										alt="lecture"
										className="h-20"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">데이터 활용 (개발 예정)</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default DataPlatformMain;
