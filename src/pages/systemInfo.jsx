import React, { useEffect, useState } from 'react';
import Sidebar from '../components/dataMap/sidebar';
import Layout from '../components/layout';
import { useOrgChartMain } from '../hooks/useOrgChart';
import { useServiceSystemInfo } from '../hooks/useSysInfo';
import { useMetadataMainDataSet } from '../hooks/useMetaData';
import systemInfo_background from '../assets/backgrounds/systemInfo_background.jpg';
import service_pionada_logo from '../assets/logos/service_pionada_logo.jpg';
import service_onlyone_logo from '../assets/logos/service_onlyone_logo.png';
import service_mathpluslearning_logo from '../assets/logos/service_mathpluslearning_logo.png';
import service_not_ready from '../assets/logos/service_not_ready.png';
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
    const [serviceDesc, setServiceDesc] = useState("");
    const [systemInfoData, setSystemInfoData] = useState({});
	
	const [isSearch, setIsSearch] = useState(false);
  
	const transformData = (data) => {
		if (data.children) {
			return {
				...data,
				children: data.children.map((child) => transformData(child)),
			};
		}
		return {
			...data,
		};
	};

	const handleNodeClick = (nodeId, nodeName, nodeDepth) => {
		location.state = null;
		setIsSearch(false);
		setClickedNodeId(nodeId);
		
		if (nodeDepth === 2) {
			console.log(nodeName);
			setServiceName(nodeName);
			fetchData();
		} else {
			// setServiceName(nodeName);
		}
	
	};
	
	const orgDataQuery = useOrgChartMain();
    const mainDatasetDataQuery = useMetadataMainDataSet(location.state?.serviceName ?? serviceName);
	const serviceSystemInfoQuery = useServiceSystemInfo(location.state?.serviceName ?? serviceName);

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
			setServiceDesc(systemInfoData.data.data.service_description);
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

	const getLogoUrl = (serviceName) => {
		switch (serviceName) {
			case "피어나다":
				return service_pionada_logo;
			case "온리원키즈":
				return service_onlyone_logo;
			case "온리원초등":
				return service_onlyone_logo;
			case "수학플러스러닝":
				return service_mathpluslearning_logo;
			default:
				return service_not_ready;
		}
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
					
					
					<div className='flex w-full h-screen justify-center items-center '>
                        <LogoCard logo_url={getLogoUrl(serviceName)} serviceDesc={serviceDesc} serviceName={serviceName}/>
                        <SystemInfoAndDataset systemInfoData={systemInfoData} mainDatasetList={mainDatasetList} onDatasetClick={handleDatasetClick}/>
					</div>
					 
					
				</div>
			</Layout>
		</>
	);
};

export default SystemInfo;
