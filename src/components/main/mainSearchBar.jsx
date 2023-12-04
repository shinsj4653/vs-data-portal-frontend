import React from "react";

const MainSearchBar = ({ searchValue, updateValue, handleSearch, autoSearchResult, isSearchBarFocus, setIsSearchBarFocus, isMain, isOrg }) => {
  
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchValue !== "" && handleSearch(searchValue);
    }
  }

  return (
    <div className={isMain || isOrg ? "relative w-full" : "w-1/2"}>
      <div className={isMain || isOrg ? "relative" : "relative ml-3"}>
        <label htmlFor="Search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="Search"
          value={searchValue}
          onChange={(event) => {
            updateValue(event.target.value);
          }}
          placeholder={isMain ? "서비스 명 혹은 데이터셋 명을 검색하세요" : "검색어를 입력하세요"}
          className={isMain || isOrg ? 
          "w-full rounded-md border-base-100 py-2.5 px-2 pe-10 shadow-sm sm:text-sm text-base-content bg-slate-100"
          : 'w-full rounded-md border-base-100 py-2.5 px-5 pe-10 shadow-sm sm:text-sm text-base-content bg-slate-100'}
          onKeyDown={(e) => activeEnter(e)}
          onFocus={isOrg ? null : () => setIsSearchBarFocus(true)}
          onBlur={isOrg ? null : () => setIsSearchBarFocus(false)}
          autoComplete="off"
        />

        <span className="absolute inset-y-0 end-0 grid my-2 mx-2 place-content-center">
          <button type="button" onClick={() => {   
              searchValue !== "" && handleSearch(searchValue);
          }}
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
      {
        searchValue !== "" && isSearchBarFocus && 
          
          <div className={!isOrg && !isMain ? "absolute z-10 w-full bg-white rounded-md shadow-lg py-1 text-base-content ml-3" : 
              (isMain ? "absolute w-full bg-white rounded-md shadow-lg py-1 text-base-content" : null)}>
            
            {autoSearchResult && autoSearchResult.length > 0  ?
              autoSearchResult.map((item, index) => {
                return (
                  <div key={index} className={"px-4 py-2 hover:bg-gray-100 cursor-pointer"} 
                  onMouseDown={isOrg ? null : (event) => {event.preventDefault(); handleSearch(item); updateValue(item)}}
                  >
                    {item}
                  </div>
                )
              }) : <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {"검색 결과가 없습니다."}
              </div>
            }
          </div>
          
      }
    </div>
  );
};

export default MainSearchBar;
