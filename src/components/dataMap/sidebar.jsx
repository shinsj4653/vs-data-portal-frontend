import React from "react";
import SidebarMenuItem from "./sidebarMenuItem";

const transformData = (data, depth = 0) => {
  // console.log('data', data);
  if (data.children) {
    return {
      ...data,
      depth,
      children: data.children.map((child) => transformData(child, depth + 1)),
    };
  }
  return {
    ...data,
    depth,
  };
};

const Sidebar = ({ data, onNodeClick, serviceName, isMap, isSearch, setIsSearch, setSearchValue, setSearchResult, setCurrentPage }) => {
  const transformedData = transformData(data);


  return (
    <>
    
      <div className="py-6 border-e hidden md:block w-1/6 min-w-fit min-h-screen">
      {!isMap ?
        !isSearch ? 
        (<div className="w-25 h-10 flex flex-row justify-center mt-5" >
        <svg onClick={() => {
          setIsSearch(true)
        }}className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 25" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path className="cursor-pointer" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <p onClick={() => {
          setIsSearch(true)
          setSearchResult([])
          setCurrentPage(1)
        }}
        className="cursor-pointer">검색하기</p>
        </div>) : (
          <div className="w-25 h-10 flex flex-row justify-center mt-5" >
          <svg onClick={() => {
            setIsSearch(false)
            setSearchResult([])
            setSearchValue("")
          }}className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 25" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path className="cursor-pointer" stroke-linecap="round" stroke-linejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
          </svg>
          <p onClick={() => {
            setIsSearch(false)
            setSearchResult([])
            setSearchValue("")
            setCurrentPage(1)
          }}
          className="cursor-pointer">뒤로가기</p>
        </div>
        ) : null}
        <ul className="mt-5 space-y-1">
          <SidebarMenuItem item={transformedData} onMenuClick={onNodeClick} serviceName={serviceName} isMap={isMap}/>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
