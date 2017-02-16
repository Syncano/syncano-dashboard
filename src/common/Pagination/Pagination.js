import React from 'react';
import ReactPaginate from 'react-paginate';

import './Pagination.sass';

const Pagination = ({ pageCount, currentPage, onPageClick }) => {
  const handlePageClick = ({ selected }) => {
    onPageClick(selected + 1);
  };

  if (!pageCount || pageCount < 2) {
    return null;
  }

  return (
    <nav className="pagination">
      <ReactPaginate
        pageCount={pageCount}
        forcePage={currentPage - 1}
        pageRangeDisplayed={5}
        marginPagesDisplayed={0}
        clickCallback={handlePageClick}
      />
    </nav>
  );
};

export default Pagination;
