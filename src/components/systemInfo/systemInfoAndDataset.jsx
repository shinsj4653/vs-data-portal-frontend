const SystemInfoAndDataset = ({systemInfoData, mainDatasetList, onDatasetClick}) => {

    const findManager = (role) => {
        let data;
        systemInfoData?.manager_list?.map((child, idx) => {
            if(child.service_mngr_tkcg === role) {
                console.log('find child! : ', child)
                data = child;
                return child;
            }
        })
        return data;
    }
    return (

        <div className='flex flex-col w-3/5 h-full pt-20 mb-15 -ml-20 drop-shadow-l'>
            <div className='flex flex-col w-full'>
                <div className='flex rounded-t-xl h-10'>
                    <div className='flex justify-center items-center w-1/4 bg-gray-100 border font-black text-[#0975DA] rounded-tl-xl text-sm'>데이터베이스 정보</div>
                    <div className='flex justify-center items-center w-3/4 bc-white border font-black rounded-tr-xl text-sm'>{systemInfoData.service_db}</div>
                </div>
                <div className='flex h-10'>
                    <div className='flex justify-center items-center w-1/4 bg-gray-100 border font-black text-[#0975DA] text-sm'>운영 환경</div>
                    <div className='flex justify-center items-center w-3/4 bc-white border font-black text-sm'>{systemInfoData.service_os}</div>
                </div>
                <div className='flex h-10'>
                    <div className='flex justify-center items-center w-1/4 bg-gray-100 border  font-black text-[#0975DA] text-sm'>홈페이지</div>
                    <div className='flex justify-center items-center w-3/4 bc-white border  font-black text-sm'>
                        <a href={systemInfoData.service_web_url} target="_blank" rel="noopener noreferrer">
                            {systemInfoData.service_web_url}
                        </a>
                    </div>
                </div>
                <div className='flex h-10'>
                    <div className='flex pl-5 items-center  w-full bc-white border font-black text-lg'>담당자 정보</div>
                </div>
                <div className='flex h-10'>
                    <div className='flex justify-center items-center w-1/4 bg-gray-100 border  font-black text-[#0975DA] text-sm'>기획 관리부서명/담당자</div>
                    <div className='flex justify-center items-center w-3/4 bc-white border  font-black text-sm'>{findManager("기획")?.service_mngr_dept} / {findManager("기획")?.service_mngr_name}</div>
                </div>
                <div className='flex h-10'>
                    <div className='flex justify-center items-center w-1/4 bg-gray-100 border font-black text-[#0975DA] text-sm'>개발 관리부서명/담당자</div>
                    <div className='flex justify-center items-center w-3/4 bc-white border font-black text-sm'>{findManager("개발")?.service_mngr_dept} / {findManager("개발")?.service_mngr_name}</div>
                </div>
                <div className='flex h-10'>
                    <div className='flex justify-center items-center w-1/4 bg-gray-100 border font-black text-[#0975DA] rounded-bl-xl text-sm'>인프라 관리부서명/담당자</div>
                    <div className='flex justify-center items-center w-3/4 bc-white border font-black rounded-br-xl text-sm'>{findManager("인프라")?.service_mngr_dept} / {findManager("인프라")?.service_mngr_name}</div>
                </div>
            </div>
            <hr className="h-0.5 bg-black mt-5 mb-5"></hr>
            <div className='flex flex-col w-full h-2/5'>
                <p className='font-black text-m mb-5'>주요 데이터셋</p>
                <div className='flex justify-center items-center h-32 w-full bg-white drop-shadow-l border-2 rounded-xl px-20'>
                    <div className='flex flex-col flex-wrap w-full justify-center items-center'>

                        <div className='flex flex-row flex-wrap h-1/2'>
                            {mainDatasetList.slice(0, Math.floor(mainDatasetList.length / 2)).map((child, idx) => {
                                return (
                                    <button
                                        className='flex justify-center items-center min-w-[7.5rem] flex-grow overflow-wrap break-word bg-white border border-[#C0C0C0]
                                        text-[#404040] text-sm mx-2 p-3 shadow-md m-2 px-4 py-2 hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:shadow-l transition duration-300'
                                        key={child}
                                        onClick={() => {
                                            onDatasetClick(child);
                                        }}
                                    >
                                        {child}
                                    </button>
                                );
                            })}
                        </div>
                        <div className='flex flex-row-reverse flex-wrap h-1/2'>
                            {mainDatasetList.slice(Math.floor(mainDatasetList.length / 2)).map((child, idx) => {
                                return (
                                    <button
                                        className='flex justify-center items-center min-w-[7.5rem] flex-grow overflow-wrap break-word bg-white border border-[#C0C0C0]
                                        text-[#404040] text-sm mx-2 p-3 shadow-md m-2 px-4 py-2 hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:shadow-l transition duration-300'
                                        key={child}
                                        onClick={() => {
                                            onDatasetClick(child);
                                        }}
                                    >
                                        {child}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SystemInfoAndDataset;
