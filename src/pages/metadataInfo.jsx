import React, { Children, useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useOrgChartMain } from '../hooks/useOrgChart';
import { useMetadataMainDataSet, useMetadataSubDataSet } from '../hooks/useMetaData';

const MetaDataInfo = () => {
	
    const [orgData, setOrgData] = useState(null);
    const [mainDataset, setMainDataset] = useState(null);
    const [subDataset, setSubDataset] = useState(null);

    const [selectedMainDataset, setSelectedMainDataset] = useState(null);
    const [selectedSubDataset, setSelectedSubDataset] = useState(null);

    const orgDataQuery = useOrgChartMain();
    const mainDatasetDataQuery = useMetadataMainDataSet("피어나다");
    const subDatasetDataQuery = useMetadataSubDataSet("피어나다");

    useEffect(() => {

        const fetchData = async () => {

          
        // 여기서 사용할 API 호출들을 배열로 묶어서 Promise.all로 처리
        const [fetchOrg, fetchMain, fetchSub] = await Promise.all([
            orgDataQuery.refetch(),
            mainDatasetDataQuery.refetch(),
            subDatasetDataQuery.refetch(),
        ]);

            // 각 API 호출이 성공하면 데이터 처리
            if (fetchOrg && fetchMain && fetchSub) {
            
                setOrgData(fetchOrg.data.data);
                setMainDataset(fetchMain.data.data);
                setSubDataset(fetchSub.data.data);
            
                setSelectedMainDataset(fetchMain.data.data[0]);
                setSelectedSubDataset(fetchSub.data.data[0]);
            }
            
            
        };
        
        fetchData();

    }, []);

    const handleMainDatasetColorChange = (name) => {
		setSelectedMainDataset(name);
	};

    if (!mainDataset || !subDataset) {
		return <div>Loading...</div>;
	}


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
							<h1 className="my-5 text-5xl font-bold">
								비상교육 메타 데이터 정보
							</h1>
							<p className="mb-5">
								메타 데이터 정보를 볼 수 있는 서비스입니다.
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center bg-slate-100 p-5">
                <div className="flex justify-center p-5">
								<div className="flex bg-slate-400 rounded-2xl p-3">
									{mainDataset?.map((child) => (
										<button
											className={`${
												selectedMainDataset === child ? 'bg-red-400' : 'bg-white'
											}  rounded-lg shadow-md m-2 px-4 py-2 hover:bg-slate-200`}
											key={child}
											onClick={() => {
												handleMainDatasetColorChange(child);
											}}
										>
											#{child}
										</button>
									))}
								</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default MetaDataInfo;
