import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center my-4">
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`${
              currentPage === pageNumber
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-100'
            } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium`}
          >
            {pageNumber}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Pagination;
