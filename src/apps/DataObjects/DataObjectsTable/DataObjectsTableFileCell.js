import React from 'react';
import { FontIcon } from 'material-ui';

const DataObjectsTableFileCell = ({ content }) => {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(content.value, '_blank');
  };

  return (
    <div onClick={handleClick}>
      <FontIcon className="synicon-download" />
    </div>
  );
};

export default DataObjectsTableFileCell;
