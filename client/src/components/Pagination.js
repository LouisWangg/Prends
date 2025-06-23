import React from "react";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

import "./Pagination.css"; // optional styling

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const showNavigation = totalPages >= 4;

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);
      if (start > 2) pages.push('...');

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="paginationWrapper">
      {showNavigation && (
        <>
          <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
            <FiChevronsLeft />
          </button>
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            <FiChevronLeft />
          </button>
        </>
      )}

      {totalPages > 1 && (
        <>
          {getPageNumbers().map((page, idx) =>
            page === '...' ? (
              <span key={idx} className="ellipsis">...</span>
            ) : (
              <button
                key={idx}
                onClick={() => onPageChange(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            )
          )}
        </>
      )}

      {showNavigation && (
        <>
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <FiChevronRight />
          </button>
          <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
            <FiChevronsRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
