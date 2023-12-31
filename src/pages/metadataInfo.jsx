import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Sidebar from '../components/dataMap/sidebar';
import Layout from '../components/layout';
import { useOrgChartMain } from '../hooks/useOrgChart';
import { useMetadataMainDataSet, useMetadataSubDataSet, useMetadataTableInfo, useMetadataTableSearch, useMetadataAutoSearch } from '../hooks/useMetaData';
import metadata_background from '../assets/backgrounds/metadata_background.jpg';
import Pagination from '../components/metaDataInfo/pagination';
import Loading from '../components/loading';
import { useLocation, useNavigate } from 'react-router-dom';
import MainSearchBar from '../components/main/mainSearchBar';


const MetaDataInfo = () => {
	
	// ci/cd, node랑 sudo node version 불일치 문제 해결
	const location = useLocation();
	const navigate = useNavigate();
	console.log(location.state);

	const [orgData, setOrgData] = useState(null);
	const mainDatasetRef = useRef(null);
	
	
    const [mainDatasetList, setMainDatasetList] = useState([]);
    const [subDatasetList, setSubDatasetList] = useState([]);
	const subDatasetRef = useRef(null);
	
	const [clickedNodeId, setClickedNodeId] = useState(null);
	const [serviceName, setServiceName] = useState(location.state?.serviceName ?? '피어나다');

	// 만약 mainCategory 있으면 그걸로, 없으면 '회원, 교사'로 초기화
	const [selectedMainDataset, setSelectedMainDataset] = useState(location.state?.selectedMainDataset ?? '회원, 교사'); // ex) '회원, 교사'
    const [selectedSubDataset, setSelectedSubDataset] = useState(location.state?.selectedSubDataset ?? '코치'); // ex) '코치'
	const [tableInfoList, setTableInfoList] = useState([]);

	
	const itemsPerPage = 15;
	const [currentPage, setCurrentPage] = useState(1);
	
	const [scrollPosition, setScrollPosition] = useState(0);
	
	const [searchStandard, setSearchStandard] = useState('통합 검색'); // [통합 검색, 테이블ID, 테이블 설명, 하위 주제]
	const [searchCondition, setSearchCondition] = useState('total'); // [total, table_id, table_comment, small_clsf_name]
	const [isSearch, setIsSearch] = useState(location.state?.searchValue === null | location.state?.searchValue === undefined ? false : true);
	const [searchValue , setSearchValue] = useState(location.state?.searchValue ?? ""); // 검색어 입력 시, 계속해서 업데이트
	const [searchResult, setSearchResult] = useState([]);
	const [currentSearch, setCurrentSearch] = useState(location.state?.searchValue ?? ""); // 현재 검색어
	// const handleDatasetColorChange
	console.log(location.state?.searchValue)

	// 검색어 자동완성에 필요한 변수들
	const [esIndex, setEsIndex] = useState('tb_table_meta_info');
	const autoSearchConditionArr = ['small_clsf_name'];
	const [autoSearchResult, setAutoSearchResult] = useState([]); // 검색어 입력 시, 계속해서 업데이트
	const [isSearchBarFocus, setIsSearchBarFocus] = useState(false);

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
	
	const handleNodeClick = (nodeId, nodeName, nodeDepth) => {
		location.state = null;
		setIsSearch(false);
		setSearchResult([]);
		setSearchValue("");
		setCurrentSearch("");
		
		setClickedNodeId(nodeId);
		setCurrentPage(1);
		
		if (nodeDepth === 2) {
			console.log(nodeName);
			setServiceName(nodeName);
		}
	};
	
	const orgDataQuery = useOrgChartMain();
    const mainDatasetDataQuery = useMetadataMainDataSet(location.state?.serviceName ?? serviceName);
    const subDatasetDataQuery = useMetadataSubDataSet(location.state?.serviceName ?? serviceName, location.state?.selectedMainDataset ?? selectedMainDataset);
	const tableInfoDataQuery = useMetadataTableInfo(location.state?.serviceName ?? serviceName, location.state?.selectedMainDataset ?? selectedMainDataset, location.state?.selectedSubDataset ?? selectedSubDataset, currentPage, itemsPerPage);
	const searchQuery = useMetadataTableSearch(searchCondition, currentSearch, currentPage, itemsPerPage);
	const autoSearchQuery = useMetadataAutoSearch(esIndex, autoSearchConditionArr, searchValue);
	
	
	const updateValue = (value) => {
		setSearchValue(value);

		// 검색어 키워드 입력할 때 마다 자동완성 결과 불러오기
		fetchAutoSearchResult();
	}

	const fetchAutoSearchResult = async () => {
		const result = await autoSearchQuery.refetch();
		if(!result.isLoading && result.data.data) {
			console.log(result.data.data);
			setAutoSearchResult(result.data.data);
		}
	}

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		isSearch ? fetchSearchResult() : fetchData("tableInfoChange");
	};
	
	const handleSearch = (value) => {

		setCurrentPage(1);		
		console.log(value);
		setCurrentSearch(value);
		setSearchResult([]);

		fetchSearchResult(); // 검색 결과 데이터 불러오기
		
	}

	const fetchSearchResult = async () => {
		
		const result = await searchQuery.refetch()
		// console.log(result.data.data);
		if(!result.isLoading && result.data.data) {
			// if(result.data.data.length === 0) {
			// 	alert("검색 결과가 없습니다.");
			// 	return;
			// }
			setSearchResult(result.data.data);
		}


	}
	const fetchData = async (param) => {
		setSearchResult([]);
		if (param === "init") {
			const [orgData, mainDataset, subDataset, tableInfoData] = await Promise.all([
				orgDataQuery.refetch(),
				mainDatasetDataQuery.refetch(),
				subDatasetDataQuery.refetch(),
				tableInfoDataQuery.refetch(),
			]);

			if (!orgData.isLoading && !mainDataset.isLoading && !subDataset.isLoading && !tableInfoData.isLoading) {
				
				const transformedData = transformData(orgData.data.data);
				setOrgData(transformedData);
				setMainDatasetList(mainDataset.data.data);
				setSelectedMainDataset(location.state?.selectedMainDataset ?? mainDataset.data.data[0]);
				
				setSubDatasetList(subDataset.data.data);
				setSelectedSubDataset(location.state?.selectedSubDataset ?? subDataset.data.data[0]);
				setTableInfoList(tableInfoData.data.data);
			}
			

		} else if (param === "serviceChange") {
			
			const mainDataset  = await mainDatasetDataQuery.refetch()

			if (!mainDataset.isLoading) { 
				setMainDatasetList(mainDataset.data.data);
				setSelectedMainDataset(location.state?.selectedMainDataset ?? mainDataset.data.data[0]);

				// 피어나다와 온리원초등 사이에서 이동할 때 중분류 명 및 메타 테이블 정보가 한 번에 안 불러와지는 오류가 존재하여, 
				// 한 번더 렌더링 시켜줌
				console.log(mainDataset.data.data);
				if (mainDataset.data.data.includes(location.state?.selectedMainDataset ?? mainDataset.data.data[0])) {
					
					const subDatasetDataRefetch = await subDatasetDataQuery.refetch();
					if (!subDatasetDataRefetch.isLoading) {
						setSubDatasetList(subDatasetDataRefetch.data.data);
						setSelectedSubDataset(location.state?.selectedSubDataset ?? subDatasetDataRefetch.data.data[0]);
					}

					if(subDatasetDataRefetch.data.data.length > 0) {
						const tableInfoDataRefetch = await tableInfoDataQuery.refetch();
						if (!tableInfoDataRefetch.isLoading)
							setTableInfoList(tableInfoDataRefetch.data.data);
					}
					

				}
			}
			
		} else if(param === "mainCategoryChange") {

			console.log('mainCategory : ', selectedMainDataset);

			if(selectedMainDataset != null) {
			const [subDataset, tableInfoData]  = await Promise.all([
				subDatasetDataQuery.refetch(),
				tableInfoDataQuery.refetch()
			]);
			
			if (!subDataset.isLoading && !tableInfoData.isLoading) {
				setSubDatasetList(subDataset.data.data);
				console.log(subDataset);
				setSelectedSubDataset(location.state?.selectedSubDataset ?? subDataset.data.data[0]);
				setTableInfoList(tableInfoData.data.data);
				
			} 
		}
		} else {
			const { isLoading, isError, data } = await tableInfoDataQuery.refetch();
			setTableInfoList([...data.data]);
			
			
		}	

    };

	
    useEffect(() => {
        fetchData("init");
    }, []);

	useEffect(() => {
		fetchData("serviceChange");
		setCurrentPage(1);
	}, [serviceName]);

	useEffect(() => {
		fetchData("mainCategoryChange");
		setCurrentPage(1);
	}, [selectedMainDataset]);

	useEffect(() => {
		fetchData("subCategoryChange");
		setCurrentPage(1);
	}, [selectedSubDataset]);


	useEffect(() => {
		isSearch ? fetchSearchResult() : fetchData("tableInfoChange");
	}, [isSearch, currentSearch, currentPage])

	useEffect(() => {
		if(location.state?.searchValue) {
			setIsSearch(true);
			setSearchValue(location.state?.searchValue);
			setCurrentSearch(location.state?.searchValue);
			setSearchResult([]);
			fetchSearchResult();
		}
	}, [location.state?.searchValue])


	useEffect(() => {
		fetchAutoSearchResult();
	}, [searchValue])

    const handleMainDatasetColorChange = (child) => {
		location.state = null;
    	
		setCurrentPage(1);
		setSelectedMainDataset(child);
		fetchData("subCategoryChange");
		
		const clickedButton = mainDatasetRef.current.querySelector(`button[data-child="${child}"]`);
		if (clickedButton) {
			// Scroll the view to the clicked element
			  setScrollPosition(mainDatasetRef.current.scrollLeft); // Store the current scroll position
			
			clickedButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
			//clickedButton.scrollLeft = mainDatasetRef.current.scrollLeft;
		  }
	};

	const handleSubDatasetColorChange = (child) => {
		location.state = null;
		const clickedButton = subDatasetRef.current.querySelector(`button[data-child="${child}"]`);
		// const allButtons = subDatasetRef.current.querySelector(`button`);

		// 모든 버튼들을 배열에 추가합니다.
		// const allButtonsArray = Array.from(allButtons).map((button) => button.getAttribute('data-child'));
		// setClickedSub(allButtonsArray);

    	if (clickedButton) {
    	  // Scroll the view to the clicked element
    	  clickedButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    	}
		
		setCurrentPage(1);
		setSelectedSubDataset(child);

	}

	const handleSearchStandardColorChange = (child) => {
		setSearchStandard(child);
		setSearchValue("");
		setCurrentSearch("");
		setSearchResult([]);

		if(child === "테이블ID") {
			setSearchCondition("table_id");
			return;
		} 
		if(child === "테이블 설명") {
			setSearchCondition("table_comment");
			return;
		} 
		if(child === "하위 주제") {
			setSearchCondition("small_clsf_name");
			return;
		} 
		if(child === "통합 검색"){
			setSearchCondition("total");
			return;
		}
	
	}

	const handleTableClick = (tableId, tableName, tableCmnt, smallClsfName) => {
		location.state = null;
		navigate('/TableInfo', {
			state: {
				tableId,
				tableName,
				tableCmnt,
				smallClsfName,
				serviceName,
				selectedMainDataset,
				selectedSubDataset,
			}
		})
	}

	const highlightLetters = (tableText, currentSearch) => {
		const highlightedParts = [];

    	for (let i = 0; i < tableText.length; i++) {
        	const char = tableText[i];
        	const isMatched = currentSearch.toLowerCase().includes(char.toLowerCase());

        	highlightedParts.push(
            	isMatched ? (
                <span key={i} className="inline-block text-[#404040] bg-yellow-300 font-bold text-sm">
                    {char}
                </span>
            ) : (
                <span key={i} className="text-[#404040] font-bold text-sm">
                    {char}
                </span>
            )
        );
    	}

    	return <span>{highlightedParts}</span>;
	}

    if (!orgData || orgDataQuery.isLoading || mainDatasetDataQuery.isLoading || subDatasetDataQuery.isLoading || tableInfoDataQuery.isLoading) {
		return (
			<Loading></Loading>
		);
	}

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
				
				<div className='flex w-full'>
				
					<Sidebar
						data={orgData}
						onNodeClick={handleNodeClick}
						serviceName={serviceName}
						isMap={false}
						isSearch={isSearch}
						setIsSearch={setIsSearch}
						setSearchValue={setSearchValue}
						setSearchResult={setSearchResult}
						setCurrentPage={setCurrentPage}
					/>
					
					{!isSearch ? (Array.isArray(mainDatasetList) && mainDatasetList.length > 0 ? (
							<div className="flex flex-col justify-top p-5 w-3/4">
									<div className="flex flex-row bg-white rounded-2xl pt-1 p-3">
										<div className='flex flex-col justify-center items-center w-1/6 pt-1'>
																						
											<p className="text-center text-gray-400 font-extrabold text-lg">상위 주제</p>
											
											<p className="font-extrabold text-blue-500">#{selectedMainDataset}</p>
										</div>
										<div className="flex flex-col w-5/6">
											<div className="flex max-w-full">

												<div className="flex flex-row overflow-x-auto scroll-smooth" ref={mainDatasetRef}>
													{Array.isArray(mainDatasetList) && mainDatasetList.map((child) => (
														<button
															className={`${
																selectedMainDataset === child ? 'bg-blue-500 text-white border-[#0091FA]' : 'bg-white text-[#C0C0C0] border-[#C0C0C0]'
															} shadow-md m-2 px-4 py-2 hover:bg-slate-100 border font-bold min-w-[9.5rem] flex-shrink-0 overflow-wrap break-word`}
															key={child}
															data-child={child}
															onClick={() => {
																handleMainDatasetColorChange(child);
															}}
														>
														#{child}
													</button>
													))
												}
												</div>
											</div>
										</div>
									</div>
									<div><hr className="h-0.3 bg-[#E5E7EB]"></hr></div>
									<div className="flex flex-row bg-white rounded-2xl p-3">
										<div className='flex flex-col justify-center items-center w-1/6 pt-1'>					
											<p className="text-center text-gray-400 font-extrabold text-lg">중위 주제</p>
											<p className="font-extrabold text-blue-500">#{selectedSubDataset}</p>
										</div>
										<div className="flex flex-col w-5/6">
											<div className="flex max-w-full">
												<div className="flex flex-row overflow-x-auto scroll-smooth" ref={subDatasetRef}>
														{Array.isArray(subDatasetList) && subDatasetList.map((child) => (
															<button
																className={`${
																	selectedSubDataset === child ? 'bg-white text-blue border border-[#0091FA] text-[#0091FA]' : 'bg-white border-[#C0C0C0] text-[#C0C0C0]'
																} shadow-md m-2 px-4 py-2 hover:bg-slate-100 border font-bold min-w-[9.5rem] flex-shrink-0 overflow-wrap break-word`}
																key={child}
																data-child={child}
																onClick={() => {
																	handleSubDatasetColorChange(child);
																}}
															>
															#{child}
														</button>
														))
													}
												</div>
											</div>
										</div>
									</div>
									<div><hr className="h-1 bg-[#E5E7EB]"></hr></div>
									<div className="flex flex-row p-3 bg-[#F2F5F8]">
											<div className='flex flex-row w-full items-center'>
												<div className='w-1/4 p-2 text-center border-r border-color-[#E5E7EB]'>
													<p className="text-center text-gray-400 font-extrabold text-lg">테이블ID</p>
												</div>
												<div className='w-1/2 p-2 text-center border-r border-color-[#E5E7EB]'>
													<p className="text-center text-gray-400 font-extrabold text-lg">테이블 설명</p>
												</div>
												<div className='w-1/4 p-2 text-center border-r border-color-[#E5E7EB]'>
													<p className="text-center text-gray-400 font-extrabold text-lg">하위 주제</p>
												</div>
											</div>				
									</div>
									<div><hr className="h-1 bg-[#E5E7EB]"></hr></div>
									<div className="flex flex-col pt-0 p-3 bg-[#F2F5F8]">
										{
											tableInfoList?.map((tableInfo) => (
												<div>
													<div className='flex flex-row w-full pt-5 pb-5 text-center items-center hover:bg-white hover:shadow-xl cursor-pointer'
														onClick={() => {
															handleTableClick(tableInfo.table_id, tableInfo.table_name, tableInfo.table_comment, tableInfo.small_clsf_name);
														}}
													>
														<div className="w-1/4 border-r border-color-[#E5E7EB] flex justify-center overflow-hidden">
															<p className="text-[#404040] font-bold text-sm overflow-hidden whitespace-nowrap truncate">
														        {tableInfo.table_id}
														    </p>
														</div>
														<div className="w-1/2 border-r border-color-[#E5E7EB] flex justify-center">		
															<p className="text-[#404040] font-bold text-sm">
														        {tableInfo.table_comment}
														    </p>
														</div>
														<div className="w-1/4 border-r border-color-[#E5E7EB] flex justify-center">			
															<p className="text-[#404040] font-bold text-sm">
														        {tableInfo.small_clsf_name}
														    </p>
														</div>
													</div>
													<div><hr className="h-0.3 bg-[#E5E7EB]"></hr></div>
												</div>
											))

										
											
										}
										<Pagination
											currentPage={currentPage}
											itemsPerPage={itemsPerPage}
											tableInfoList={tableInfoList}
											onPageChange={handlePageChange}
											isSearchPage={false}
											>
										</Pagination>
									</div>
						</div>
						
						
					) : (
						<div className="flex flex-col items-center justify-top p-5 w-3/4 mt-10">
							<h3 className='text-[#404040]'>해당 브랜드의 메타 데이터는 아직 준비중입니다.</h3>
						</div>
					)) : (
						<div className="flex flex-col justify-top p-5 w-3/4">
									<div className="flex flex-row bg-white rounded-2xl pt-1 p-3">
										<div className='flex justify-center items-center w-1/6'>
											<p className="text-center text-gray-400 font-extrabold text-lg">검색 기준</p>
										</div>
										<div className="flex flex-col w-5/6">
											<div className="flex flex-row items-center">

												<div className="flex flex-row overflow-x-auto scroll-smooth w-1/2">
													{["통합 검색","테이블ID", "테이블 설명", "하위 주제"].map((child) => (
														<button
														className={`${
															searchStandard === child ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-400 border-gray-300'
														} shadow-md m-2 px-10 py-2 hover:bg-slate-100 border font-semibold min-w-[9.5rem]`}
														key={child}
														data-child={child}
														onClick={() => {
															handleSearchStandardColorChange(child);
															setSearchResult([]);
														}}
													>
													{child}
														</button>
													))
												}
												</div>
												<MainSearchBar
													searchValue={searchValue}
													updateValue={updateValue}
													handleSearch={handleSearch}
													autoSearchResult={autoSearchResult}
													isSearchBarFocus={isSearchBarFocus}
													setIsSearchBarFocus={setIsSearchBarFocus}
													isMain={false}
													isOrg={false}
													onMouseLeave={() => {
														setIsSearchBarFocus(false);
													}}
													/>
											</div>
										</div>
									</div>
									
									<div><hr className="h-1 bg-[#E5E7EB]"></hr></div>
									<div className="flex flex-row p-3 bg-[#F2F5F8]">
										{["테이블ID", "테이블 설명", "하위 주제"].map((label) => (

											<div className='w-1/3' key={label}>
												<div className='p-2 text-center border-r border-color-[#E5E7EB]'>
													<p className="text-center text-gray-400 font-extrabold text-lg">{label}</p>
												</div>
											</div>
										))}
									</div>
									<div><hr className="h-1 bg-[#E5E7EB]"></hr></div>
									<div className="flex flex-col pt-0 p-3 bg-[#F2F5F8]">
										{
											searchResult.length > 0 ? searchResult?.map((tableInfo) => {
												

												return (
													<div>
														<div className='flex flex-row w-full pt-5 pb-5 text-center items-center hover:bg-white hover:shadow-xl cursor-pointer'
														onClick={() => {
															handleTableClick(tableInfo.table_id, tableInfo.table_name, tableInfo.table_comment, tableInfo.small_clsf_name);
														}}>
															<div className="w-1/3 border-r border-color-[#E5E7EB] flex justify-center">
																<span className="text-[#404040] font-bold text-sm">
																	{searchCondition === "total" || searchCondition === "table_id" ? highlightLetters(tableInfo.table_id, currentSearch) : tableInfo.table_id}
																</span>
															</div>
															<div className="w-1/3 border-r border-color-[#E5E7EB] flex justify-center">
																<span className="text-[#404040] font-bold text-sm">
																	{searchCondition === "total" || searchCondition === "table_comment" ? highlightLetters(tableInfo.table_comment, currentSearch) : tableInfo.table_comment}
																</span>
															</div>
															<div className="w-1/3 border-r border-color-[#E5E7EB] flex justify-center">
															    <span className="text-[#404040] font-bold text-sm">
															        {searchCondition === "total" || searchCondition === "small_clsf_name" ? highlightLetters(tableInfo.small_clsf_name, currentSearch) : tableInfo.small_clsf_name}
															    </span>
															</div>
														</div>
														<div><hr className="h-0.1 bg-[#E5E7EB]"></hr></div>
													</div>
												)
											}) :
											<div className='flex flex-row w-full pt-5 pb-5 text-center justify-center items-center'>
											{/* <div className="w-1/8 border-r border-gray-300 flex items-center overflow-hidden border-[#E5E7EB]"> */}
												<div className="w-1/8 flex items-center overflow-hidden">
												    <p className="text-[#404040] text-sm">
												        검색 결과가 없습니다. 
												    </p>
												</div>

											</div>

										}
										<Pagination
											currentPage={currentPage}
											itemsPerPage={itemsPerPage}
											tableInfoList={searchResult}
											onPageChange={handlePageChange}
											isSearchPage={true}
											>
										</Pagination>
										
									</div>
						</div>
					)}
				</div>
			</Layout>
		</>
	);
};

export default MetaDataInfo;
