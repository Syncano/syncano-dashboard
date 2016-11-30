import React from 'react';

const DataObjectsTableJSONCell = ({ content }) => {
  const textContent = JSON.stringify(content);

  return (
    <div title={textContent}>
      {textContent}
    </div>
  );
};

export default DataObjectsTableJSONCell;
