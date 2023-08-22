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
	
	const [isSearch, setIsSearch] = useState(false);
  
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

    if (!orgData || orgDataQuery.isLoading || mainDatasetDataQuery.isLoading || !systemInfoData || serviceSystemInfoQuery.isLoading) {
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
						(<div className='flex w-full items-center '>
                            <LogoCard logo_url={service_pionada_log} serviceDesc={serviceDesc} serviceName={serviceName}/>
                            <SystemInfoAndDataset systemInfoData={systemInfoData} mainDatasetList={mainDatasetList} onDatasetClick={handleDatasetClick}/>
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
