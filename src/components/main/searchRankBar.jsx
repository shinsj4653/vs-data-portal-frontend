import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SearchRankBar = ({ searchRankResult }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShowAll, setIsShowAll] = useState(false);

    const navigate = useNavigate();
    const URL = window.location.href;


    useEffect(() => {
      const tickerInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % searchRankResult.length);
      }, 4000);
      
      return () => clearInterval(tickerInterval);
    }, [searchRankResult]);

    const showAllSearchRank = (event) => {
      // 실시간 검색어 순위 영역에 마우스 올렸을 때
      // 실시간 검색어 순위 전체 보여주기
      // 마우스를 올렸을 때만 작동
      // 마우스를 내렸을 때는 작동하지 않음

      // 코드 알려줘
      
      
    }
  
    return (
      <div className="w-1/5 h-6 relative" 
        onMouseOver={() => {
          setIsShowAll(true)
        }}
        onMouseOut={
          () => {
            setIsShowAll(false)
          }
      }>
        {searchRankResult.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full">
          <span className="font-bold text-[#00B2E2]"> 검색 기록이 없습니다. </span>
        </div>
        ) :
        isShowAll ?
        (
          
          <div className="flex flex-col items-center justify-center w-full h-25 hover:absolute -top-3 bg-white z-10">
          {searchRankResult.map((item, index) => (
            <div key={index} className="flex justify-center w-full px-4 py-3 font-bold items-center cursor-pointer hover:bg-gray-100 text-base-content"
              onClick={() => {
                console.log(URL)
                console.log(item.keyword)
                if(URL.includes("MetaDataInfo")){
                  navigate('/MetaDataInfo', {
                    state: {
                      searchValue: item.keyword
                    }
                  })
                } else {
                  navigate('/', {
                    state: {
                      searchValue: item.keyword
                    }
                  })
                }
                
              }}
              >
              <span className="font-bold text-[#00B2E2]">{index + 1}.</span>
              <span className="font-bold text-[#00B2E2]">{item.keyword}</span>
            </div>
          ))}
        </div>
        ) :
        (
          <div className="w-full h-full overflow-hidden">
          <ul
            className="w-full list-none p-0 m-0 transition-transform duration-400 ease-in-out"
            style={{ transform: `translateY(-${currentIndex * 24}px)` }}
          >
            {searchRankResult.map((item, index) => (
              <li key={index} className="justify-center h-34 px-4 font-bold flex items-center">
                <span className="font-bold text-[#00B2E2]">{index + 1}.</span>
                <span className="font-bold text-[#00B2E2]">{item.keyword}</span> 
              </li>
            ))}
          </ul> 
          </div>
        )}
      </div>
    );
};

export default SearchRankBar;
