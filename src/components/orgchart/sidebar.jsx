import React, {useState} from "react";
import MainSearchBar from "../main/mainSearchBar";
// import DataDrivenOrgChart from "./dataDrivenOrgChart";

const Sidebar = ({onTargetSelect}) => {

  const [selectedButton, setSelectedButton] = useState(null);
  const targetData = ['유아', '초등', '중고등', '성인', '글로벌'];
  const mainUnstructuredData = ['음성 데이터', '텍스트 데이터', '영상 데이터', '이미지 데이터'];
  
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    onTargetSelect(buttonName);
    // console.log(selectedButton);
  };

  const handleResetClick = (buttonName) => {
    setSelectedButton(buttonName);
    onTargetSelect(null);
  }

  return (
    <>
      <div className="border-e hidden md:block w-1/5 max-w-fit mt-0"> 
        <div className="px-4">
          <div className="pb-7">
            <div className="justify-center items-center">
                <p className="flex justify-center mb-7 h-full text-[#C0C0C5] font-extrabold text-2xl">
                  VISANG
                </p>
            </div>
            <div><hr className="ml-3 mr-3 border bg-[#C0C0C5]"></hr></div>
            
          </div>
          <div className="flex flex-col text-[#C0C0C5] ml-3 mr-3">
            <span className="ml-1 h-7 w-32 mb-2">Dataset 검색하기</span>
            <MainSearchBar></MainSearchBar>
          </div>
          <ul className="mt-6 space-y-1">
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-[#00B2E2] hover:text-white">
                  <span className="text-sm font-medium"
                    onClick={() => handleResetClick(selectedButton)}                
                  > 서비스 대상 </span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  {targetData.map((targetName) => (

                    <li key={targetName}>
                      <button
                        className={`text-left w-full block rounded-lg px-4 py-2 text-sm font-medium ${
                          selectedButton === targetName
                            ? "bg-[#00B2E2] text-white"
                            : "text-gray-500 hover:bg-[#00B2E2] hover:text-white"
                        }`}
                        onClick={() => handleButtonClick(targetName)}
                      >
                        {targetName}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-[#00B2E2] hover:text-white">
                  <span className="text-sm font-medium"
                    onClick={() => handleResetClick(selectedButton)}> 주요 비정형 <br></br>데이터 종류 </span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  {mainUnstructuredData.map((data) => (

                    <li key={data}>
                      <button
                        className={`text-left w-full block rounded-lg px-4 py-2 text-sm font-medium ${
                          selectedButton === data
                            ? "bg-[#00B2E2] text-white"
                            : "text-gray-500 hover:bg-[#00B2E2] hover:text-white"
                        }`}
                        onClick={() => handleButtonClick(data)}
                      >
                        {data}
                      </button>
                    </li>
                  ))}
                </ul>

              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
