import React, {useState, useEffect} from "react";

const MainSearchBar = ({ searchValue, updateValue, handleSearch, autoSearchResult, isSearchBarFocus, setIsSearchBarFocus, isMain, isOrg }) => {

  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  const handleDropDownKey = (e) => {

    // input에 값이 있을 때만 작동
    // 아래키 누르면 다음 항목으로 이동
    // 위키 누르면 이전 항목으로 이동
    // 엔터 누르면 해당 항목으로 검색

    if (searchValue !== "") {
      if (
        e.key === 'ArrowDown' &&
        autoSearchResult.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      }
      if (e.key === 'ArrowUp' && dropDownItemIndex > 0)
        setDropDownItemIndex(dropDownItemIndex - 1)
      if (e.key === 'Enter' && dropDownItemIndex >= 0) {
        handleSearch(autoSearchResult[dropDownItemIndex])
        updateValue(autoSearchResult[dropDownItemIndex])
        setDropDownItemIndex(-1)
      }
    }

  }

  return (
    <div className={isMain || isOrg ? "relative" : "relative w-1/2"}>
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
          onKeyUp={handleDropDownKey}
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
          
          <div className={!isOrg && !isMain ? "absolute w-full bg-white rounded-md shadow-lg py-1 text-base-content ml-3" : 
              (isMain ? "absolute w-full bg-white rounded-md shadow-lg py-1 text-base-content" : null)}>
            
            {autoSearchResult && autoSearchResult.length > 0  ?
              autoSearchResult.map((item, index) => {
                return (
                  <div key={index} className={index === dropDownItemIndex ? "px-4 py-2 bg-gray-100 hover:bg-gray-100 cursor-pointer" : "px-4 py-2 hover:bg-gray-100 cursor-pointer"} 
                  onMouseDown={isOrg ? null : (event) => {event.preventDefault(); handleSearch(item); updateValue(item); setDropDownItemIndex(-1);}}
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
