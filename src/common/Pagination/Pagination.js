import React from 'react';
import ReactPaginate from 'react-paginate';

import './Pagination.sass';

const Pagination = ({ pageNum, currentPage, clickCallback }) => {
  const handleClick = ({ selected }) => {
    clickCallback(selected + 1);
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
        clickCallback={handleClick}
      />
    </nav>
  );
};

export default Pagination;
