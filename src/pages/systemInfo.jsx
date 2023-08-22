import React, { useEffect, useState } from 'react';
import Sidebar from '../components/dataMap/sidebar';
import Layout from '../components/layout';
import { useOrgChartMain, useSercviceSystemInfo } from '../hooks/useOrgChart';
import { useMetadataMainDataSet } from '../hooks/useMetaData';
import systemInfo_background from '../assets/backgrounds/systemInfo_background.jpg';
import service_pionada_log from '../assets/logos/service_pionada_logo.jpg';
import Loading from '../components/loading';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LogoCard from '../components/systemInfo/logoCard';
import SystemInfoAndDataset from '../components/systemInfo/systemInfoAndDataset';


const SystemInfo = () => {
	
    const navigate = useNavigate();
	const location = useLocation();
	console.log(location.state);

	const [orgData, setOrgData] = useState(null);
    const [mainDatasetList, setMainDatasetList] = useState([]);
	
	const [clickedNodeId, setClickedNodeId] = useState(null);
	const [serviceName, setServiceName] = useState(location.state?.serviceName ?? '피어나다');
    const [serviceDesc, setServiceDesc] = useState('심리 상담부터 학습 코칭까지 하나로 결합한');
    const [systemInfoData, setSystemInfoData] = useState({});

	// 만약 mainCategory 있으면 그걸로, 없으면 '회원, 교사'로 초기화
	
	const itemsPerPage = 15;
	const [currentPage, setCurrentPage] = useState(1);
	
	
	const [searchCondition, setSearchCondition] = useState('table_id_or_name'); // [테이블ID & 이름, 기타
	const [isSearch, setIsSearch] = useState(false);
	const [currentSearch, setCurrentSearch] = useState(null); // 현재 검색어

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;


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

		setClickedNodeId(nodeId);
		setCurrentPage(1);

		if (nodeDepth === 2) {
			console.log(nodeName);
			setServiceName(nodeName);
		}
	
	};
	
	const orgDataQuery = useOrgChartMain();
    const mainDatasetDataQuery = useMetadataMainDataSet(location.state?.serviceName ?? serviceName);
	const serviceSystemInfoQuery = useSercviceSystemInfo(location.state?.serviceName ?? serviceName);

	const fetchData = async () => { 
	    const [orgData, mainDataset, systemInfoData] = await Promise.all([
	    	orgDataQuery.refetch(),
	    	mainDatasetDataQuery.refetch(),
            serviceSystemInfoQuery.refetch()
	    ])  
	    if (!orgData.isLoading && !mainDataset.isLoading && !systemInfoData.isLoading) {
        
	    	const transformedData = transformData(orgData.data.data);
	    	setOrgData(transformedData);
	    	setMainDatasetList(mainDataset.data.data);
            setSystemInfoData(systemInfoData.data.data);
        }
        
    };

    const handleDatasetClick = (datasetName) => {
        navigate('/metadataInfo', {
            state: {
              serviceName,
              selectedMainDataset : datasetName,
            }
          })
    }
	
    useEffect(() => {
        fetchData();
    }, [serviceName]);

    useEffect(() => {

    }, [mainDatasetList, systemInfoData])


    if (!orgData || orgDataQuery.isLoading || mainDatasetDataQuery.isLoading) {
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
					/>
					
					{serviceName === "피어나다" ?
						(<div className='flex w-full items-center -ml-5'>
                            <LogoCard logo_url={service_pionada_log} serviceDesc={serviceDesc} serviceName={serviceName}/>
                            <SystemInfoAndDataset systemInfoData={systemInfoData} mainDatasetList={mainDatasetList} onDatasetClick={handleDatasetClick}/>
                            {/* <div className='flex flex-col w-3/5 h-full pt-20 mb-15 -ml-10 drop-shadow-l'>
                                <div className='flex flex-col w-full'>
                                    <div className='flex rounded-t-xl h-10'>
                                        <div className='flex justify-center items-center w-1/4 bg-gray-100 border font-black text-[#0975DA] rounded-tl-xl text-sm'>데이터베이스 정보</div>
                                        <div className='flex justify-center items-center w-3/4 bc-white border font-black rounded-tr-xl text-sm'>Maria DB</div>
                                    </div>
                                    <div className='flex h-10'>
                                        <div className='flex justify-center items-center w-1/4 bg-gray-100 border font-black text-[#0975DA] text-sm'>운영 환경</div>
                                        <div className='flex justify-center items-center w-3/4 bc-white border font-black text-sm'>Amazon Web Service Cloud</div>
                                    </div>
                                    <div className='flex h-10'>
                                        <div className='flex justify-center items-center w-1/4 bg-gray-100 border  font-black text-[#0975DA] text-sm'>홈페이지</div>
                                        <div className='flex justify-center items-center w-3/4 bc-white border  font-black text-sm'>https://www.pionada.com</div>
                                    </div>
                                    <div className='flex h-10'>
                                        <div className='flex pl-5 items-center  w-full bc-white border font-black text-lg'>담당자 정보</div>
                                    </div>
                                    <div className='flex h-10'>
                                        <div className='flex justify-center items-center w-1/4 bg-gray-100 border  font-black text-[#0975DA] text-sm'>기획 관리부서명/담당자</div>
                                        <div className='flex justify-center items-center w-3/4 bc-white border  font-black text-sm'>서비스 Cell / 김영갑</div>
                                    </div>
                                    <div className='flex h-10'>
                                        <div className='flex justify-center items-center w-1/4 bg-gray-100 border font-black text-[#0975DA] text-sm'>개발 관리부서명/담당자</div>
                                        <div className='flex justify-center items-center w-3/4 bc-white border font-black text-sm'>서비스 Cell / 박건규</div>
                                    </div>
                                    <div className='flex h-10'>
                                        <div className='flex justify-center items-center w-1/4 bg-gray-100 border font-black text-[#0975DA] rounded-bl-xl text-sm'>인프라 관리부서명/담당자</div>
                                        <div className='flex justify-center items-center w-3/4 bc-white border font-black rounded-br-xl text-sm'>IT인프라 Cell / 임종규, 고영원</div>
                                    </div>
                                </div>
                                <hr className="h-0.5 bg-black mt-5 mb-5"></hr>
                                <div className='flex flex-col w-full h-2/5'>
                                    <p className='font-black text-m mb-5'>주요 데이터셋</p>
                                    <div className='flex justify-center items-center h-32 w-full bg-white drop-shadow-l border-2 rounded-xl px-20'>
                                        <div className='flex flex-wrap w-full h-full justify-center items-center'>
                                        {
                                            mainDatasetList?.map((child, idx) => {
                                                return (
                                                    <button
                                                        className='flex justify-center items-center w-1/4 h-12 bg-gray-100 border font-black text-sm mx-2 p-3 drop-shadow-l hover:shadow-xl transition duration-300'
                                                        key={child}
                                                        onClick={() => {
                                                            handleDatasetClick(child);
                                                        }}
                                                    >
                                                        {child}
                                                    </button>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div> */}
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
