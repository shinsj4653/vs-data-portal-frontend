import React, { useState } from "react";
import Layout from "../components/layout";
import metadata_background from '../assets/backgrounds/metadata_background.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from "../components/metaDataInfo/pagination";

const TableInfo = (props) => {

    const navigate = useNavigate();

    const itemsPerPage = 1;
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = (list, pageNumber) => {
		setCurrentPage(pageNumber);
		console.log("길이 ", list.length);
		console.log("total ", totalPages);
		console.log("현재 페이지 ", pageNumber);
	};

    const [colInfoList, setColInfoList] = useState([
        {
            'table_meta_detail_info_id': 1,
            'table_col_id': 'COL_001',
            'table_col_name': 'COL_NM_001',
            'table_col_datatype': 'VARCHAR2',
            'table_col_comment': '컬럼 설명 001'
        },
        {
            'table_meta_detail_info_id': 2,
            'table_col_id': 'COL_001',
            'table_col_name': 'COL_NM_001',
            'table_col_datatype': 'VARCHAR2',
            'table_col_comment': '컬럼 설명 001'
        },
        {
            'table_meta_detail_info_id': 3,
            'table_col_id': 'COL_001',
            'table_col_name': 'COL_NM_001',
            'table_col_datatype': 'VARCHAR2',
            'table_col_comment': '컬럼 설명 001'
        },
    ])

    const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const visibleItems = colInfoList.slice(startIndex, endIndex);

    return (
        <>
            <Layout>
                <div className='flex flex-col justify-center items-center' style={{ backgroundImage: `url(${metadata_background})` }}>
					<div className="hero-overlay bg-primary-content bg-opacity-70"></div>
					<div className="hero-content text-center text-neutral-100">
						<div>
							<h1 className="my-5 text-5xl font-bold">
								비상교육 메타 데이터 정보
							</h1>
							<p className="mb-5">
								비상교육 브랜드 별 메타 데이터 정보를 볼 수 있는 서비스입니다.
							</p>
						</div>
					</div>
				</div>
                <div className="flex flex-col w-full px-28 mt-5">
                    <p className="font-black text-2xl">데이터 상세</p>
                    <div className="flex flex-col justify-center border border-gray-300 mt-5 p-5 h-28">
                        <p className="font-black text-xl mb-2">설문참여학생</p>
                        <p>설문참여학생 관리를 위한 테이블입니다.</p>
                    </div>

                    <div className='flex flex-col w-full mt-5'>
                        <div className='flex rounded-t-xl h-10'>
                            <div className='flex justify-center items-center w-1/4 bg-[#F8F6F1] border font-black text-sm'>제공 서비스</div>
                            <div className='flex items-center w-3/4 pl-5 bc-white border font-bold text-sm'>{'피어나다'}</div>
                            <div className='flex justify-center items-center w-1/4 bg-[#F8F6F1] border font-black text-sm'>테이블ID</div>
                            <div className='flex items-center w-3/4 pl-5 bc-white border font-bold  text-sm'>{'TB_SURVEY_MEM'}</div>
                        </div>
                        <div className='flex h-10'>
                            <div className='flex justify-center items-center w-1/4 bg-[#F8F6F1] border font-black text-sm'>분류 체계</div>
                            <div className='flex items-center w-3/4 pl-5 bc-white border font-bold  text-sm'>{'홈페이지, 앱 - 설문조사'}</div>
                            <div className='flex justify-center items-center w-1/4 bg-[#F8F6F1] border font-black text-sm'>키워드</div>
                            <div className='flex items-center w-3/4 pl-5 bc-white border font-bold  text-sm'>{'키워드'}</div>
                        </div>
                    </div>

                    <p className="font-black text-l mt-5">데이터 항목(칼럼) 정보</p>

                    {/* make me a table which has No, ColumnId, ColumnName, ColumnType, and Column Desc */}
                             <div className="flex flex-row p-3 bg-[#F2F5F8] mt-5">
                                            <div className='w-1/12'>
												<div className='p-2 text-center border-r border-color-[#E5E7EB]'>
													<p className="text-center font-black text-lg">{'No.'}</p>
												</div>
											</div>
                                            <div className='w-2/12'>
												<div className='p-2 text-center border-r border-color-[#E5E7EB]'>
													<p className="text-center font-black text-lg">{'컬럼 ID'}</p>
												</div>
											</div>
                                            <div className='w-2/12'>
												<div className='p-2 text-center border-r border-color-[#E5E7EB]'>
													<p className="text-center font-black text-lg">{'컬럼명 (한글명)'}</p>
												</div>
											</div>
                                            <div className='w-1/12'>
												<div className='p-2 text-center border-r border-color-[#E5E7EB]'>
													<p className="text-center font-black text-lg">{'데이터 타입'}</p>
												</div>
											</div>
                                            <div className='w-6/12'>
												<div className='p-2 text-center border-r border-color-[#E5E7EB]'>
													<p className="text-center font-black text-lg">{'컬럼 설명'}</p>
												</div>
											</div>
									</div>
									<div><hr className="h-1 bg-[#E5E7EB]"></hr></div>
									<div className="flex flex-col pt-0 p-3">
										{
											visibleItems.length > 0 ? Array.isArray(visibleItems) && visibleItems.map((colInfo) => {
											
												return (
													<div>
														<div className='flex flex-row w-full pt-5 pb-5 text-center items-center'>
															<div className="w-1/12 border-r border-color-[#E5E7EB] flex justify-center">
																<span className="font-black font-bold text-sm">
																	{colInfo.table_meta_detail_info_id}
																</span>
															</div>
															<div className="w-2/12 border-r border-color-[#E5E7EB] flex justify-center">
																<span className="font-black font-bold text-sm">
																	{colInfo.table_col_id}
																</span>
															</div>
															<div className="w-2/12 border-r border-color-[#E5E7EB] flex justify-center">
															    <span className="font-black font-bold text-sm">
															        {colInfo.table_col_name}
															    </span>
															</div>
															<div className="w-1/12 border-r border-color-[#E5E7EB] flex justify-center">
															    <span className="font-black font-bold text-sm">
															        {colInfo.table_col_datatype}
															    </span>
															</div>
                                                            <div className="w-6/12 border-r border-color-[#E5E7EB] flex justify-center">
															    <span className="font-black font-bold text-sm">
															        {colInfo.table_col_comment}
															    </span>
															</div>
														</div>
													</div>
												)
											}) :
											<div className='flex flex-row w-full pt-5 pb-5 text-center justify-center items-center'>
											{/* <div className="w-1/8 border-r border-gray-300 flex items-center overflow-hidden border-[#E5E7EB]"> */}
												<div className="w-1/8 flex items-center overflow-hidden">
												    <p className="text-gray-400 text-sm">
												        컬럼 정보가 존재하지 않습니다.
												    </p>
												</div>

											</div>

										}
										<Pagination
											currentPage={currentPage}
											itemsPerPage={itemsPerPage}
											tableInfoList={colInfoList}
											onPageChange={handlePageChange}
											isSearchPage={false}
											>
										</Pagination>

                                        <div className="flex justify-center mt-5">
                                            <button onClick={() => { navigate(-1); }} className='bg-white text-blue border border-[#0091FA] text-[#0091FA] shadow-md m-2 px-4 py-2 hover:bg-slate-100 border font-bold min-w-[9.5rem] flex-shrink-0 overflow-wrap break-word'>목록</button>
                                        </div>
										
									</div>
                
                    
                </div>
            </Layout>
        </>
    )
    
};

export default TableInfo;