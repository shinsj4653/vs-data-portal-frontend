import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Sidebar from '../components/dataMap/sidebar';
import Layout from '../components/layout';
import { useOrgChartMain } from '../hooks/useOrgChart';
import { useMetadataMainDataSet, useMetadataSubDataSet, useMetadataTableInfo, useMetadataTableSearch } from '../hooks/useMetaData';
import systemInfo_background from '../assets/backgrounds/systemInfo_background.jpg';
import service_pionada_log from '../assets/logos/service_pionada_logo.jpg';
import Pagination from '../components/metaDataInfo/pagination';
import Loading from '../components/loading';
import { useLocation } from 'react-router-dom';
import MainSearchBar from '../components/main/mainSearchBar';


const SystemInfo = () => {
	
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
	
	const [searchStandard, setSearchStandard] = useState('테이블ID & 테이블명');
	const [searchCondition, setSearchCondition] = useState('table_id_or_name'); // [테이블ID & 이름, 기타
	const [isSearch, setIsSearch] = useState(false);
	const [searchValue , setSearchValue] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [currentSearch, setCurrentSearch] = useState(null); // 현재 검색어

	const [searchPageNo, setSearchPageNo] = useState(1); // 검색 결과 페이지 번호
	const [searchAmountPerPage, setSearchAmountPerPage] = useState(15); // 검색 결과 페이지 당 개수

	const searchQuery = useMetadataTableSearch(serviceName, searchCondition, currentSearch, searchPageNo, searchAmountPerPage);

	

	const handlePageChange = (list, pageNumber, isSearchPage) => {
		isSearchPage ? setSearchPageNo(pageNumber) : setCurrentPage(pageNumber);
		console.log("길이 ", list.length);
		console.log("total ", totalPages);
		console.log("현재 페이지 ", pageNumber);
	};

	useEffect(() => {

		fetchResultData();
		

	}, [searchPageNo, searchAmountPerPage]);
	
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
	

	const updateValue = (value) => {
		setSearchValue(value);
	}

	const handleSearch = (value) => {
		console.log(value.toLowerCase());
		setCurrentSearch(value.toLowerCase());

		if(searchValue == "") {
			alert("검색어를 입력해주세요.");
			return;
		} else 
			fetchResultData(); 

		
	}

	const fetchResultData = async () => {
		
		const result = await searchQuery.refetch();
		// console.log(result.data.data);
		if(!result.isLoading) {
			if (result.data.data.length == 0 ) {
				setSearchResult([]);
				alert("검색 결과가 없습니다.");
				return;
			}
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

	useEffect(() => {
		fetchResultData();
	}, [searchPageNo, currentSearch])

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
		setSearchValue("");
		setCurrentSearch(null);
		setSearchResult([]);

		if(child === "테이블ID & 테이블명") {
			setSearchCondition("table_id_or_name");
		} else if(child === "하위 주제") {
			setSearchCondition("small_clsf_name");
		}
	}

	const highlightLetters = (tableText, currentSearch) => {
		const regex = new RegExp(currentSearch, 'gi');
    	const matches = tableText.match(regex);

    	if (!matches) return <span className="text-gray-400 font-bold text-sm">{tableText}</span>;

    	const parts = tableText.split(regex);
    	const highlightedParts = [];

    	parts.forEach((part, index) => {
    	    highlightedParts.push(<span className="text-gray-400 font-bold text-sm" key={index}>{part}</span>);

    	    if (index < parts.length - 1) {
    	        highlightedParts.push(
    	            <span key={`highlight-${index}`} className="inline-block px-1 py-0.5 text-gray-400 bg-yellow-300 font-extrabold text-sm">
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
			<div className='flex flex-col justify-center items-center bg-cover' style={{ backgroundImage: `url(${systemInfo_background})` }}>
					<div className="hero-overlay bg-primary-content bg-opacity-70"></div>
					<div className="hero-content text-center text-neutral-100">
						<div>
							<h1 className="my-5 text-5xl font-bold">
								비상교육 시스템 정보
							</h1>
							<p className="mb-5">
								비상교육 전체 브랜드의 시스템 정보를 볼 수 있는 서비스입니다.
							</p>
						</div>
					</div>
				</div>
				
				<div className='flex w-full'>
				
					<Sidebar
						data={orgData}
						onNodeClick={handleNodeClick}
						serviceName={serviceName}
						isMap={true}
						isSearch={isSearch}
						setIsSearch={setIsSearch}
						setSearchValue={setSearchValue}
						setSearchResult={setSearchResult}
					/>
					
					{serviceName === "피어나다" ?
						(<div className='flex w-full justify-center items-center'>
                            <div className='flex w-1/3 justify-center pt-20 h-full bg-white p-100'>
                                <div className='flex flex-col justify-center items-center space-y-10 w-9/12 h-1/3 bg-white drop-shadow-2xl hover:shadow-xl transition duration-300'>
                                    <div className='flex w-3/4 h-4/6 bg-contain bg-center bg-no-repeat' style={{backgroundImage: `url(${ service_pionada_log })`}} />
                                    <div className='flex flex-col items-center'>
                                        <p className='font-semibold	'>심리 상담부터 학습 코칭까지 하나로 결합한</p>
                                        <p className='font-black text-xl'>[피어나다]</p>  
                                    </div>  
                                </div>
                            </div>

                            <div className='flex flex-col w-2/3 h-full'>
                                <div className='flex flex-col w-full drop-shadow-xl'>
                                    <div className='flex rounded-t-xl h-10'>
                                        <div className='flex justify-center items-center w-1/5 bc-[#F5F7FA] border font-black text-[#0975DA] rounded-tl-xl text-sm'>데이터베이스 정보</div>
                                        <div className='flex justify-center items-center w-4/5 bc-white border font-black rounded-tr-xl text-sm'>Maria DB</div>
                                    </div>
                                    <div className='flex h-10'>
                                        <div className='flex justify-center items-center w-1/5 bc-[#F5F7FA] border font-black text-[#0975DA] text-sm'>운영 환경</div>
                                        <div className='flex justify-center items-center w-4/5 bc-white border font-black text-sm'>Amazon Web Service Cloud</div>
                                    </div>
                                    <div className='flex h-10'>
                                        <div className='flex justify-center items-center w-1/5 bc-[#F5F7FA] border  font-black text-[#0975DA] text-sm'>홈페이지</div>
                                        <div className='flex justify-center items-center w-4/5 bc-white border  font-black text-sm'>https://www.pionada.com</div>
                                    </div>
                                    <div className='flex h-10'>
                                        <div className='flex pl-5 items-center w-4/5 bc-white border font-black text-lg'>담당자 정보</div>
                                    </div>
                                    <div className='flex h-10'>
                                        <div className='flex justify-center items-center w-1/5 bc-[#F5F7FA] border  font-black text-[#0975DA] text-sm'>기획 관리부서명/담당자</div>
                                        <div className='flex justify-center items-center w-4/5 bc-white border  font-black text-sm'>서비스 Cell / 김영갑</div>
                                    </div>
                                    <div className='flex h-10'>
                                        <div className='flex justify-center items-center w-1/5 bc-[#F5F7FA] border font-black text-[#0975DA] text-sm'>개발 관리부서명/담당자</div>
                                        <div className='flex justify-center items-center w-4/5 bc-white border font-black text-sm'>서비스 Cell / 박건규</div>
                                    </div>
                                    <div className='flex h-10'>
                                        <div className='flex justify-center items-center w-1/5 bc-[#F5F7FA] border font-black text-[#0975DA] rounded-bl-xl text-sm'>인프라 관리부서명/담당자</div>
                                        <div className='flex justify-center items-center w-4/5 bc-white border font-black rounded-br-xl text-sm'>IT인프라 Cell / 임종규, 고영원</div>
                                    </div>
                                </div>
                                <hr className="h-0.5 bg-black mt-15 mb-15" />
                                <div>
                                    <p className='font-black text-m'>주요 데이터셋</p>
                                    <div className='flex flex-wrap w-full h-48 drop-shadow-xl bc-green-500'>
                                        hifawefawf
                                        awfaw
                                        wafw
                                    </div>
                                </div>
                            </div>
						</div>)
					 : (
						<div className="flex flex-col items-center justify-top p-5 w-3/4 mt-10">
							<h3>해당 브랜드의 시스템 정보는 아직 준비중입니다.</h3>
						</div>
					)
					}
				</div>
			</Layout>
		</>
	);
};

export default SystemInfo;
