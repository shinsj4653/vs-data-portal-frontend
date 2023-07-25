import React from "react";

const MainSearchBar = () => {
  return (
    <>
      <div className="relative">
        <label htmlFor="Search" className="sr-only">
          Search
        </label>

        <input
          type="text"
          id="Search"
          placeholder="개발 예정"
          disabled
          className="w-full rounded-md border-base-100 py-2.5 px-2 pe-10 shadow-sm sm:text-sm text-base-content bg-slate-100"
        />

        <span className="absolute inset-y-0 end-0 grid my-2 mx-0 place-content-center">
          <button type="button">
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="h-8 w-8"
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
