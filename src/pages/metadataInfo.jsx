import React, { useEffect, useState } from 'react';
import Sidebar from '../components/dataMap/sidebar';
import Layout from '../components/layout';
import { useOrgChartMain } from '../hooks/useOrgChart';
import { useMetadataMainDataSet, useMetadataSubDataSet, useMetadataTableInfo } from '../hooks/useMetaData';
import metadata_background from '../assets/backgrounds/metadata_background.jpg';
import Pagination from '../components/metaDataInfo/pagination';
import Loading from '../components/loading';

const MetaDataInfo = () => {
	
	const [orgData, setOrgData] = useState(null);
    const [mainDataset, setMainDataset] = useState(null);
    const [subDataset, setSubDataset] = useState(null);
	
	const [clickedNodeId, setClickedNodeId] = useState(null);
	const [serviceName, setServiceName] = useState('피어나다');
	const [mainCategoryName, setMainCategoryName] = useState('회원, 교사'); // ex) '회원, 교사'
    const [subCategoryName, setSubCategoryName] = useState('코치'); // ex) '코치'
	const [tableInfoList, setTableInfoList] = useState([]);

	const itemsPerPage = 15;
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(tableInfoList.length / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const visibleItems = tableInfoList.slice(startIndex, endIndex);
	
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

	const handleNodeClick =   (nodeId, nodeName, nodeDepth) => {
		setClickedNodeId(nodeId);

		if (nodeDepth === 2) {
			console.log(nodeName);
			setServiceName(nodeName);
			fetchData("serviceChange");
		}
	
	};
	const orgDataQuery = useOrgChartMain();
    const mainDatasetDataQuery = useMetadataMainDataSet(serviceName);
    const subDatasetDataQuery = useMetadataSubDataSet(serviceName, mainCategoryName);
	const tableInfoDataQuery = useMetadataTableInfo(serviceName, mainCategoryName, subCategoryName, itemsPerPage, currentPage);

	const fetchData = async (param) => {
			
			if (param === "init") {

				const [orgData, mainDataset, subDataset, tableInfoData] = await Promise.all([
					orgDataQuery.refetch(),
					mainDatasetDataQuery.refetch(),
					subDatasetDataQuery.refetch(),
					tableInfoDataQuery.refetch()
				]);
				
				if (orgData.isSuccess && mainDataset.isSuccess && subDataset.isSuccess && tableInfoData.isSuccess &&
					!orgData.isLoading && !mainDataset.isLoading && !subDataset.isLoading && !tableInfoData.isLoading) {
					
					const transformedData = transformData(orgData.data.data);
					setOrgData(transformedData);
					setMainDataset(mainDataset.data.data);
					setMainCategoryName(mainDataset.data.data[0]);

					if (mainCategoryName != null && subCategoryName != null) {
						setSubDataset(subDataset.data.data);
						setSubCategoryName(subDataset.data.data[0].sub_category_name);
						setTableInfoList(tableInfoData.data.data);
					}
				
				}
			} else if (param === "serviceChange") {
			
				const [mainDataset, subDataset, tableInfoData]  = await Promise.all([
					mainDatasetDataQuery.refetch(),
					subDatasetDataQuery.refetch(),
					tableInfoDataQuery.refetch()
				]);
				
				
				if (mainDataset.isSuccess && subDataset.isSuccess && tableInfoData.isSuccess
					&& !mainDataset.isLoading && !subDataset.isLoading && !tableInfoData.isLoading) {

					setMainDataset(mainDataset.data.data);
					setMainCategoryName(mainDataset.data.data[0]);	
					
					if (mainCategoryName != null && subCategoryName != null){
						setSubDataset(subDataset.data.data);
						setSubCategoryName(subDataset.data.data[0].sub_category_name);
						setTableInfoList(tableInfoData.data.data);
					}
				}
					
				
			} else if(param === "mainCategoryChange") {

				const [subDataset, tableInfoData]  = await Promise.all([
					subDatasetDataQuery.refetch(),
					tableInfoDataQuery.refetch()
				]);
				
				if (!subDataset.isLoading && !tableInfoData.isLoading && subDataset.isSuccess && tableInfoData.isSuccess) {
					
					if (mainCategoryName != null && subCategoryName != null) {
						setSubDataset(subDataset.data.data);
						setSubCategoryName(subDataset.data.data[0].sub_category_name);
						setTableInfoList(tableInfoData.data.data);
					}
					
				} 
			} else {
				const tableInfoData = await tableInfoDataQuery.refetch();
				if (!tableInfoData.isLoading && tableInfoData.isSuccess) 
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
	}, [mainCategoryName])

	useEffect(() => {
		fetchData("subCategoryChange");
	}, [subCategoryName, currentPage])
	
    const handleMainDatasetColorChange = (name) => {
		setMainCategoryName(name);
		fetchData("mainCategoryChange");
	};

	const handleSubDatasetColorChange = (name) => {
		setSubCategoryName(name);
		fetchData("subCategoryChange");
	}

    if (!orgData || orgDataQuery.isLoading || mainDatasetDataQuery.isLoading || subDatasetDataQuery.isLoading || tableInfoDataQuery.isLoading ) {
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
					/>
					{Array.isArray(mainDataset) && mainDataset.length > 0 ? (

						<div className="flex flex-col justify-top p-5 w-3/4">
									<div className="flex flex-row bg-white rounded-2xl p-3">
										<div className='flex items-center w-1/6'>
											<p className='text-center' style={{color:"#94A3B8", fontWeight:"1000", fontSize:"17px", marginLeft:"33%"}}>상위 주제</p>
										</div>
										<div className="flex flex-col w-5/6">
											<div className="flex max-w-full overflow-x-auto">
												<div className="flex flex-row">
													{Array.isArray(mainDataset) && mainDataset.map((child) => (
														<button
															className={`${
																mainCategoryName === child ? 'bg-blue-500' : 'bg-white'
															}  shadow-md m-2 px-4 py-2 hover:bg-slate-100`}
															style={{
																fontWeight: "700",
																minWidth: '9.3rem',
																borderColor: mainCategoryName === child ? '#0091FA' : '#C0C0C0',
																color: mainCategoryName === child ? '#FFFFFF' : '#C0C0C0'}}
															key={child}
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
										<div className='flex items-center w-1/6'>
											<p className='text-center' style={{color:"#94A3B8", fontWeight:"1000", fontSize:"17px", marginLeft:"33%"}}>중위 주제</p>
										</div>
										<div className="flex flex-col w-5/6">
											<div className="flex max-w-full overflow-x-auto">
												<div className="flex flex-row">
													{Array.isArray(subDataset) && subDataset.map((child) => (
														<button
															className={`${
																subCategoryName === child.sub_category_name ? 'bg-blue-500' : 'bg-white'
															}  shadow-md m-2 px-4 py-2 hover:bg-slate-100`}
															style={{
																fontWeight: "700",
																minWidth: '8rem',
																borderColor: subCategoryName === child.sub_category_name ? '#0091FA' : '#C0C0C0',
																color: subCategoryName === child.sub_category_name ? '#FFFFFF' : '#C0C0C0'}}
															key={child.sub_category_name}
															onClick={() => {
																handleSubDatasetColorChange(child.sub_category_name);
															}}
														>
															#{child.sub_category_name}
														</button>
													))}
												</div>
											</div>
										</div>
									</div>
									<div><hr style={{height:"2px", backgroundColor:"#E5E7EB"}}></hr></div>
									<div className="flex flex-row p-3" style={{backgroundColor: '#F2F5F8'}}>
										{["테이블ID", "테이블명", "테이블 설명", "하위 주제"].map((label) => (

											<div className='w-1/4' key={label}>
												<div className='p-2 text-center border-r' style={{borderRightColor:"#E5E7EB"}}>
													<p style={{color:"#94A3B8", fontWeight:"1000", fontSize:"17px"}}>{label}</p>
												</div>
											</div>
										))}
									</div>
									<div><hr style={{height:"4px", backgroundColor:"#E5E7EB"}}></hr></div>
									<div className="flex flex-col p-3" style={{backgroundColor: '#F2F5F8'}}>
										{
											Array.isArray(tableInfoList) && tableInfoList.map((tableInfo) => (
												<div>
													<div className='flex flex-row w-full p-2 text-center'>
														<div className='w-1/4 border-r items-center mb-1' style={{borderRigthColor:'#E5E7EB'}}><p style={{color:"#C0C0C0", fontWeight:"800", fontSize:"15px"}}>{tableInfo.table_id}</p></div>
														<div className='w-1/4 border-r items-center mb-1' style={{borderRigthColor:'#E5E7EB'}}><p style={{color:"#C0C0C0", fontWeight:"800", fontSize:"15px"}}>{tableInfo.table_name}</p></div>
														<div className='w-1/4 border-r items-center mb-1' style={{borderRigthColor:'#E5E7EB'}}><p style={{color:"#C0C0C0", fontWeight:"800", fontSize:"15px"}}>{tableInfo.table_comment}</p></div>
														<div className='w-1/4 border-r items-center mb-1' style={{borderRigthColor:'#E5E7EB'}}><p style={{color:"#C0C0C0", fontWeight:"800", fontSize:"15px"}}>{tableInfo.small_clsf_name}</p></div>
													</div>
													<div><hr style={{height:"1px", backgroundColor:"#E5E7EB"}}></hr></div>
												</div>
											))
										}
									</div>
						</div>
					) : (
						<div className="flex flex-col items-center justify-top p-5 w-3/4 mt-10">
							<h3>해당 브랜드의 메타 데이터는 아직 준비중입니다.</h3>
						</div>
					)}
				</div>
			</Layout>
		</>
	);
};

export default MetaDataInfo;
