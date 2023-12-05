import React, { useState, useEffect } from "react";
import NewsTicker from "react-advanced-news-ticker";

const SearchRankBar = ({ searchRankResult }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const tickerInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % searchRankResult.length);
      }, 4000);
  
      return () => clearInterval(tickerInterval);
    }, [searchRankResult]);
  
    return (
      <div className="w-1/5 h-7 overflow-hidden ">
        {searchRankResult && searchRankResult.length > 0 ? (
          <ul
            className="list-none p-0 m-0 transition-transform duration-400 ease-in-out"
            style={{ transform: `translateY(-${currentIndex * 24}px)` }}
          >
            {searchRankResult.map((item, index) => (
              <li key={index} className="h-34 px-4 font-bold flex items-center">
                <span className="font-bold text-[#00B2E2]">{index + 1}.</span>
                <span className="font-bold text-[#00B2E2]">{item.keyword}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-[#00B2E2]"> 검색 기록이 없습니다. </span>
          </div>
        )}
      </div>
    );
};

export default SearchRankBar;
