import React from 'react';
import ReactPaginate from 'react-paginate';

import './Pagination.sass';

const Pagination = ({ pageNum, currentPage, onPageClick }) => {
  const handlePageClick = ({ selected }) => {
    onPageClick(selected + 1);
  };

  if (!pageNum) {
    return null;
  }

  return (
    <nav className="pagination">
      <ReactPaginate
        pageNum={pageNum}
        forceSelected={currentPage - 1}
        pageRangeDisplayed={5}
        marginPagesDisplayed={0}
        clickCallback={handlePageClick}
      />
    </nav>
  );
};

export default Pagination;
