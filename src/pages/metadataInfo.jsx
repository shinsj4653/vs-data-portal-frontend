import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Sidebar from '../components/dataMap/sidebar';
import Layout from '../components/layout';
import { useOrgChartMain } from '../hooks/useOrgChart';
import { useMetadataMainDataSet, useMetadataSubDataSet, useMetadataTableInfo, useMetadataTableSearch } from '../hooks/useMetaData';
import metadata_background from '../assets/backgrounds/metadata_background.jpg';
import Pagination from '../components/metaDataInfo/pagination';
import Loading from '../components/loading';
import { useLocation } from 'react-router-dom';
import MainSearchBar from '../components/main/mainSearchBar';


const MetaDataInfo = () => {
	
	const location = useLocation();
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
	const [totalPages, setTotalPages] = useState(0);
	
	const [scrollPosition, setScrollPosition] = useState(0);
	
	

	

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		console.log("길이 ", tableInfoList.length);
		console.log("total ", totalPages);
		console.log("현재 페이지 ", pageNumber);
	};
	
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const visibleItems = tableInfoList.slice(startIndex, endIndex);

	// const handleDatasetColorChange
  
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
	const tableInfoDataQuery = useMetadataTableInfo(location.state?.serviceName ?? serviceName, location.state?.selectedMainDataset ?? selectedMainDataset, location.state?.selectedSubDataset ?? selectedSubDataset);


	const [searchStandard, setSearchStandard] = useState('테이블ID & 이름');
	const [isSearch, setIsSearch] = useState(false);
	const [searchValue , setSearchValue] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [currentSearch, setCurrentSearch] = useState(null); // 현재 검색어

	const searchQuery = useMetadataTableSearch(serviceName, searchValue);

	const updateValue = (value) => {
		setSearchValue(value);
	}

	const handleSearch = (value) => {
		console.log(value.toLowerCase());
		setCurrentSearch(value.toLowerCase());

		if(searchValue == "") {
			alert("검색어를 입력해주세요.");
		} else if (searchValue.length < 2) {
			alert("검색어는 2글자 이상 입력해주세요.");
		} else if(searchStandard === "테이블ID & 이름") {
			
			fetchResultData();
		}
	}

	const fetchResultData = async () => {
		
		const result = await searchQuery.refetch();
		console.log(result.data.data);
		if(result.data.data.length == 0) {
			alert("검색 결과가 없습니다.");
			return;
		} 
		setSearchResult(result.data.data);
	}

	const fetchData = async (param) => { 

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
			
			const [mainDataset, subDataset, tableInfoData]  = await Promise.all([
				mainDatasetDataQuery.refetch(),
				subDatasetDataQuery.refetch(),
				tableInfoDataQuery.refetch()
			]);

			if (!mainDataset.isLoading && !subDataset.isLoading && !tableInfoData.isLoading) { 
				setMainDatasetList(mainDataset.data.data);
				setSelectedMainDataset(location.state?.selectedMainDataset ?? mainDataset.data.data[0]);

				// 피어나다와 온리원초등 사이에서 이동할 때 중분류 명 및 메타 테이블 정보가 한 번에 안 불러와지는 오류가 존재하여, 
				// 한 번더 렌더링 시켜줌
				const subDatasetDataRefetch = await subDatasetDataQuery.refetch();
				if (!subDatasetDataRefetch.isLoading) {
					setSubDatasetList(subDatasetDataRefetch.data.data);
					setSelectedSubDataset(location.state?.selectedSubDataset ?? subDatasetDataRefetch.data.data[0]);
				}
				const tableInfoDataRefetch = await tableInfoDataQuery.refetch();
					if (!tableInfoDataRefetch.isLoading)
						setTableInfoList(tableInfoDataRefetch.data.data);

			}
			
		} else if(param === "mainCategoryChange") {
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
		} else {
			const tableInfoData = await tableInfoDataQuery.refetch();
			if(!tableInfoData.isLoading)
				setTableInfoList(tableInfoData.data.data);
		}	

    };

	
    useEffect(() => {
        fetchData("init");
    }, []);

	useEffect(() => {
		fetchData("serviceChange");
	}, [serviceName]);

	useEffect(() => {
		fetchData("mainCategoryChange");
	}, [selectedMainDataset]);

	useEffect(() => {
		fetchData("subCategoryChange");
	}, [selectedSubDataset]);

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
	

	// const [clickedSub, setClickedSub] = useState([]);

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
	}

	const highlightLetters = (tableText, currentSearch) => {
		const regex = new RegExp(currentSearch, 'gi');
    	const matches = tableText.match(regex);

    	if (!matches) return <span style={{color:"#C0C0C0", fontWeight:"800", fontSize:"13.5px"}}>{tableText}</span>;

    	const parts = tableText.split(regex);
    	const highlightedParts = [];

    	parts.forEach((part, index) => {
    	    highlightedParts.push(<span style={{color:"#C0C0C0", fontWeight:"800", fontSize:"13.5px"}} key={index}>{part}</span>);

    	    if (index < parts.length - 1) {
    	        highlightedParts.push(
    	            <span key={`highlight-${index}`} style={{color:"#C0C0C0", backgroundColor: 'yellow', fontWeight:"800", fontSize:"13.5px"}}>
    	                {matches[index]}
    	            </span>
    	        );
    	    }
    	});

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
				<div
					className="flex flex-col justify-center items-center"
					style={{
						backgroundImage: `url(${metadata_background})`,
					}}
				>
					<div className="hero-overlay bg-primary-content bg-opacity-70"></div>
					<div className="hero-content text-center text-neutral-100">
						<div className="">
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
					/>
					
					{!isSearch ? (Array.isArray(mainDatasetList) && mainDatasetList.length > 0 ? (

						<div className="flex flex-col justify-top p-5 w-3/4">
									<div className="flex flex-row bg-white rounded-2xl pt-1 p-3">
										<div className='flex flex-col items-center w-1/6 pt-3'>
											{selectedMainDataset ? (												
												<p className='text-center' style={{color:"#94A3B8", fontWeight:"1000", fontSize:"17px"}}>상위 주제</p>
												//marginLeft:"33%"
											) : (
												<p className='text-center' style={{
													color: "#94A3B8",
													fontWeight: "1000",
													fontSize: "17px",
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													height: '100%'	
												}}>
													상위 주제
												</p>
											)}
											<p style={{ fontWeight: "1000",color : '#0091FA'}}>#{selectedMainDataset}</p>
										</div>
										<div className="flex flex-col w-5/6">
											<div className="flex max-w-full">

												<div className="flex flex-row overflow-x-auto scroll-smooth" ref={mainDatasetRef}>
													{Array.isArray(mainDatasetList) && mainDatasetList.map((child) => (
														<button
															className={`${
																selectedMainDataset === child ? 'bg-blue-500' : 'bg-white'
															}  shadow-md m-2 px-4 py-2 hover:bg-slate-100`}
															
															style={{
																fontWeight: "700",
																minWidth: '9.5rem',
																borderColor: selectedMainDataset === child ? '#0091FA' : '#C0C0C0',
																color: selectedMainDataset === child ? '#ffffff' : '#C0C0C0'}}
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
									<div><hr style={{height:"2px", backgroundColor:"#E5E7EB"}}></hr></div>
									<div className="flex flex-row bg-white rounded-2xl p-3">
										<div className='flex flex-col items-center w-1/6 pt-1.5'>
											
										{selectedSubDataset ? (												
												<p className='text-center' style={{color:"#94A3B8", fontWeight:"1000", fontSize:"17px"}}>중위 주제</p>
												//marginLeft:"33%"
											) : (
												<p className='text-center' style={{
													color: "#94A3B8",
													fontWeight: "1000",
													fontSize: "17px",
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													height: '100%'	
												}}>
													중위 주제
												</p>
											)}
											
											<p style={{ fontWeight: "1000",color : '#0091FA'}}>#{selectedSubDataset}</p>
									
										</div>
										<div className="flex flex-col w-5/6">
											<div className="flex max-w-full">
												<div className="flex flex-row overflow-x-auto scroll-smooth" ref={subDatasetRef}>
													{Array.isArray(subDatasetList) && subDatasetList.map((child) => (
														<button
															className={`${
																selectedSubDataset === child ? 'bg-white text-blue border border-blue-500' : 'bg-white'
															}  shadow-md m-2 px-4 py-2 hover:bg-slate-100`}
															style={{
																fontWeight: "700",
																minWidth: '9.5rem',
																borderColor: selectedSubDataset === child ? '#0091FA' : '#C0C0C0',
																color: selectedSubDataset === child ? '#0091FA' : '#C0C0C0'
															}}
															key={child}
															data-child={child}
															onClick={() => {
																handleSubDatasetColorChange(child);
															}}
														>
															#{child}
														</button>
													))}
												</div>
											</div>
										</div>
									</div>
									<div><hr style={{height:"7px", backgroundColor:"#E5E7EB"}}></hr></div>
									<div className="flex flex-row p-3" style={{backgroundColor: '#F2F5F8'}}>
										{["테이블ID", "테이블명", "테이블 설명", "하위 주제"].map((label) => (

											<div className='w-1/4' key={label}>
												<div className='p-2 text-center border-r' style={{borderRightColor:"#E5E7EB"}}>
													<p style={{color:"#94A3B8", fontWeight:"1000", fontSize:"17px"}}>{label}</p>
												</div>
											</div>
										))}
									</div>
									<div><hr style={{height:"3px", backgroundColor:"#E5E7EB"}}></hr></div>
									<div className="flex flex-col pt-0 p-3" style={{backgroundColor: '#F2F5F8'}}>
										{
											Array.isArray(visibleItems) && visibleItems.map((tableInfo) => (
												<div>
													<div className='flex flex-row w-full pt-5 pb-5 text-center items-center'>
														<div className='w-1/4 border-r items-center' style={{borderRigthColor:'#E5E7EB', overflow: 'hidden'}}><p style={{color:"#C0C0C0", fontWeight:"800", fontSize:"13.5px", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{tableInfo.table_id}</p></div>
														<div className='w-1/4 border-r items-center' style={{borderRigthColor:'#E5E7EB'}}><p style={{color:"#C0C0C0", fontWeight:"800", fontSize:"13.5px"}}>{tableInfo.table_name}</p></div>
														<div className='w-1/4 border-r items-center' style={{borderRigthColor:'#E5E7EB'}}><p style={{color:"#C0C0C0", fontWeight:"800", fontSize:"13.5px"}}>{tableInfo.table_comment}</p></div>
														<div className='w-1/4 border-r items-center' style={{borderRigthColor:'#E5E7EB'}}><p style={{color:"#C0C0C0", fontWeight:"800", fontSize:"13.5px"}}>{tableInfo.small_clsf_name}</p></div>
													</div>
													<div><hr style={{height:"1px", backgroundColor:"#E5E7EB"}}></hr></div>
												</div>
											))
										}
										<Pagination
											currentPage={currentPage}
											itemsPerPage={itemsPerPage}
											tableInfoList={tableInfoList}
											onPageChange={handlePageChange}>
										</Pagination>
									</div>
						</div>
					) : (
						<div className="flex flex-col items-center justify-top p-5 w-3/4 mt-10">
							<h3>해당 브랜드의 메타 데이터는 아직 준비중입니다.</h3>
						</div>
					)) : (
						<div className="flex flex-col justify-top p-5 w-3/4">
									<div className="flex flex-row bg-white rounded-2xl pt-1 p-3">
										<div className='flex flex-col items-center w-1/6 pt-3'>
											<p className='text-center' style={{color:"#94A3B8", fontWeight:"1000", fontSize:"17px"}}>검색 기준</p>
										</div>
										<div className="flex flex-col w-5/6">
											<div className="flex flex-row items-center w-100%">

												<div className="flex flex-row overflow-x-auto scroll-smooth" ref={mainDatasetRef}>
													{["테이블ID & 이름", "기타"].map((child) => (
														<button
															className={`${
																searchStandard === child ? 'bg-blue-500' : 'bg-white'
															}  shadow-md m-2 px-4 py-2 hover:bg-slate-100`}
															
															style={{
																fontWeight: "700",
																minWidth: '9.5rem',
																borderColor: searchStandard === child ? '#0091FA' : '#C0C0C0',
																color: searchStandard === child ? '#ffffff' : '#C0C0C0'}}
															key={child}
															data-child={child}
															onClick={() => {
																handleSearchStandardColorChange(child);
															}}
														>
															{child}
														</button>
													))
												}
												</div>
												<MainSearchBar searchValue={searchValue} updateValue={updateValue} handleSearch={handleSearch} isMain={false}/>
											</div>
										</div>
									</div>
									<div><hr style={{height:"2px", backgroundColor:"#E5E7EB"}}></hr></div>
									
									<div><hr style={{height:"7px", backgroundColor:"#E5E7EB"}}></hr></div>
									<div className="flex flex-row p-3" style={{backgroundColor: '#F2F5F8'}}>
										{["테이블ID", "테이블명", "테이블 설명", "하위 주제"].map((label) => (

											<div className='w-1/4' key={label}>
												<div className='p-2 text-center border-r' style={{borderRightColor:"#E5E7EB"}}>
													<p style={{color:"#94A3B8", fontWeight:"1000", fontSize:"17px"}}>{label}</p>
												</div>
											</div>
										))}
									</div>
									<div><hr style={{height:"3px", backgroundColor:"#E5E7EB"}}></hr></div>
									<div className="flex flex-col pt-0 p-3" style={{backgroundColor: '#F2F5F8'}}>
										{
											searchResult.length > 0 ? Array.isArray(searchResult) && searchResult.map((tableInfo) => {
												


												return (
													<div>
														<div className='flex flex-row w-full pt-5 pb-5 text-center items-center'>
															<div className='w-1/4 border-r items-center' style={{borderRigthColor:'#E5E7EB', overflow: 'hidden'}}>
																{highlightLetters(tableInfo.table_id, currentSearch)}
															</div>
															<div className='w-1/4 border-r items-center' style={{borderRigthColor:'#E5E7EB'}}>
																{highlightLetters(tableInfo.table_name, currentSearch)}
															</div>
															<div className='w-1/4 border-r items-center' style={{borderRigthColor:'#E5E7EB'}}><p style={{color:"#C0C0C0", fontWeight:"800", fontSize:"13.5px"}}>{tableInfo.table_comment}</p></div>
															<div className='w-1/4 border-r items-center' style={{borderRigthColor:'#E5E7EB'}}><p style={{color:"#C0C0C0", fontWeight:"800", fontSize:"13.5px"}}>{tableInfo.small_clsf_name}</p></div>
														</div>
														<div><hr style={{height:"1px", backgroundColor:"#E5E7EB"}}></hr></div>
													</div>
												)
											}) :
											<div className='flex flex-row w-full pt-5 pb-5 text-center justify-center items-center'>
												<div className='w-1/4 border-r items-center' style={{borderRightColor:'#E5E7EB', overflow: 'hidden'}}><p style={{color:"#C0C0C0", fontWeight:"800", fontSize:"13.5px", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>검색 결과가 없습니다.</p></div>
											</div>

										}
										
									</div>
						</div>
					)}
				</div>
			</Layout>
		</>
	);
};

export default MetaDataInfo;
