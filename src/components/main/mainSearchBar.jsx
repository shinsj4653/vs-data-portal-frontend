import React from "react";

const MainSearchBar = ({ searchValue, updateValue, handleSearch, isMain, isOrg }) => {
  
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchValue !== "" && handleSearch(searchValue);
    }
  }

  return (
    <>
      <div className={isMain || isOrg ? "relative" : "relative w-1/2 ml-3"}>
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
          readOnly={isOrg}
          placeholder={isMain ? "서비스 명 혹은 데이터셋 명을 검색하세요" : "검색어를 입력하세요"}
          className={isMain || isOrg ? 
          "w-full rounded-md border-base-100 py-2.5 px-2 pe-10 shadow-sm sm:text-sm text-base-content bg-slate-100"
          : 'w-full rounded-md border-base-100 py-2.5 px-5 pe-10 shadow-sm sm:text-sm text-base-content bg-slate-100'}
          onKeyDown={(e) => activeEnter(e)}
        />

        <span className="absolute inset-y-0 end-0 grid my-2 mx-2 place-content-center">
          <button type="button" onClick={() => {
            if (!isOrg) {
              searchValue !== "" && handleSearch(searchValue);
            }
          }}
          disabled={isOrg}
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
    </>
  );
};

export default MainSearchBar;
