// Pagination.js
import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className='flex gap-2 items-center justify-center mt-10'>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button key={index} onClick={() => onPageChange(index + 1)}
          className={`p-1 px-3 rounded-xl bg-gray-300 ${currentPage === index + 1 ? "bg-gray-500 text-white" : ""}`}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
