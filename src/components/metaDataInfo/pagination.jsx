import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, tableInfoList, onPageChange }) => {
  // console.log("페이지 : ", currentPage)
  // console.log(itemsPerPage)
  const totalPages = Math.ceil(tableInfoList.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  // console.log(pageNumbers)
  const pagesToShow = 10; // 한번에 보여줄 페이지 개수

  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  // 이전 버튼을 눌렀을 때 표시할 페이지 수가 pageToShow 개수 이하인 경우, startPage를 조정하여 pageToShow 개수만큼 보이게끔 함
  if (startPage > 1 && endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(1, startPage - (pagesToShow - (endPage - startPage + 1)));
  }
  
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
    window.scrollTo(0, 130); // 메타테이블리스트 상단으로 스크롤
  };

  return (
    <div className="flex justify-center my-4">
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage -1)}
            className='bg-white text-black-500 hover:bg-gray-100 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium'
            style={{
              borderLeft : "none",
              borderTop: "none",
              borderBottom: "none",
              backgroundColor:"#f2f5f8", boxShadow:"none"}}
          >
            ◀
          </button>
        )}

        {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
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
            onClick={() => handlePageChange(currentPage + 1)}
            className='bg-white text-black-500 hover:bg-gray-100 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium'
            style={{
              borderRight : "none",
              borderTop: "none",
              borderBottom: "none",
              backgroundColor:"#f2f5f8", boxShadow:"none"}}
          >
            ▶
          </button>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
