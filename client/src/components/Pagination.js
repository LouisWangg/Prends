import React from "react";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import "./Pagination.css"; // optional styling

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="paginationWrapper">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        <FiChevronsLeft />
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <FiChevronLeft />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <FiChevronRight />
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        <FiChevronsRight />
      </button>
    </div>
  );
};

export default Pagination;
