import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, tableInfoList, onPageChange, isSearchPage, isDetail }) => {
  const totalPages = isSearchPage ? Math.ceil(tableInfoList[0]?.total_num / itemsPerPage) : Math.ceil(tableInfoList[0]?.total_num / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pagesToShow = 10; // 한번에 보여줄 페이지 개수

  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  // 이전 버튼을 눌렀을 때 표시할 페이지 수가 pageToShow 개수 이하인 경우, startPage를 조정하여 pageToShow 개수만큼 보이게끔 함
  if (startPage > 1 && endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(1, startPage - (pagesToShow - (endPage - startPage + 1)));
  }

  return (
    <div className="flex justify-center my-4">
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        {currentPage > 1 && (
          <button
            onClick={() => {
              onPageChange(currentPage - 1);
            }}
            className={
              `${
                isDetail ? 'bg-white' : 'bg-[#f2f5f8]'
              } text-black-500 hover:bg-gray-100 relative inline-flex items-center px-4 py-2 border-r border-gray-300 text-sm font-medium boxshadow-none`
            }
          >
            ◀
          </button>
        )}

        {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => {
              onPageChange(pageNumber);
              window.scrollTo(0, 130);
            }}
            className={`${
              currentPage === pageNumber
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black-500 hover:bg-gray-100'
            } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium`}
          >
            {pageNumber}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => {
              onPageChange(currentPage + 1);
            }}
            className={
              `${
                isDetail ? 'bg-white' : 'bg-[#f2f5f8]'
              } text-black-500 hover:bg-gray-100 relative inline-flex items-center px-4 py-2 border-l border-gray-300 text-sm font-medium boxshadow-none`
            }
          >
            ▶
          </button>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
