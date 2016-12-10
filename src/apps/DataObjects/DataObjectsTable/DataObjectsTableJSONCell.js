import React from 'react';
import Truncate from '../../../common/Truncate';

const DataObjectsTableJSONCell = ({ content }) => {
  const textContent = JSON.stringify(content);

  return (
    <Truncate
      text={textContent}
      title={textContent}
    />
  );
};

export default DataObjectsTableJSONCell;
