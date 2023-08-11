import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataMapAllDataset } from '../../hooks/useDataMap';
import { useDatasetSearch } from '../../hooks/useDpMain';

const DpMainSearch = ({ setIsSearch, currentSearch, setSearchValue, searchResult }) => {

    const navigate = useNavigate();

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

	useEffect(() => {
		console.log('searchResult', searchResult);
	}, [searchResult])

    return (<div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-8 bg-gray-100">
					
					<div className="flex flex-row justify-between mb-8">
						<div className="flex flex-row" onClick={() => {
								setIsSearch(false);
								setSearchValue("");
							}}
							style={{cursor: 'pointer'}}
							>
							<button >
                            <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 25" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path className="cursor-pointer" stroke-linecap="round" stroke-linejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                            </svg>
							</button>
							<p>뒤로가기</p>
							
						</div>
					</div>

								

					<div className="flex flex-row p-3" style={{backgroundColor: '#FFF'}}>
										{["서비스명", "데이터 셋"].map((label) => (

											<div className='w-1/2' key={label}>
												<div className='p-2 text-center border-r' style={{borderRightColor:"#E5E7EB"}}>
													<p style={{color:"#94A3B8", fontWeight:"1000", fontSize:"17px"}}>{label}</p>
												</div>
											</div>
										))}
									</div>
									<div><hr style={{height:"3px", backgroundColor:"#E5E7EB"}}></hr></div>
					<div className="flex flex-col pt-0 p-3" style={{backgroundColor: '#FFF'}}>
					{
						searchResult?.length > 0 ? searchResult?.map((tableInfo) => (
						
							<div style={{
								cursor: 'pointer',
								overflow: 'hidden',
								whiteSpace: 'nowrap',
								textOverflow: 'ellipsis',
							}}
								className='hover:bg-gray-100'
								onClick={() => {
									navigate('/metadataInfo', {
										state: {
										  serviceName: tableInfo.service_name,
										  selectedMainDataset : tableInfo.dataset_name,
										}
									  })
								}}
							>
								<div className='flex flex-row w-full pt-5 pb-5 text-center items-center'>
									<div className='w-1/2 border-r items-center' 
									style={{borderRightColor:'#E5E7EB', overflow: 'hidden'}}>
										{
											tableInfo.service_name?.split("").map((letter) => {
												if(currentSearch.indexOf(letter) !== -1 && tableInfo.service_name.indexOf(currentSearch) !== -1){
													return <span style={{color:"#C0C0C0", backgroundColor: 'yellow' ,fontWeight:"800", fontSize:"13.5px", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{letter}</span>
												} else {
													return <span style={{color:"#C0C0C0", fontWeight:"800", fontSize:"13.5px", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{letter}</span>
												}
											})
										}
										</div>
										<div className='w-1/2 border-r items-center' style={{borderRightColor:'#E5E7EB', overflow: 'hidden'}}>
											{highlightLetters(tableInfo.dataset_name, currentSearch)}
										</div>
								</div>
								<div><hr style={{height:"1px", backgroundColor:"#E5E7EB"}}></hr></div>
							</div> 
						)) : 
						<div className='flex flex-row w-full pt-5 pb-5 text-center items-center'>
							<div className='w-full border-r items-center' style={{borderRigthColor:'#E5E7EB', overflow: 'hidden'}}><p style={{color:"#C0C0C0", fontWeight:"800", fontSize:"13.5px", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>검색 결과가 없습니다.</p></div>
						</div>

						}

					</div>
					
				</div>)};

export default DpMainSearch;