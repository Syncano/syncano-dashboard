import React from 'react';
import Truncate from '../../../common/Truncate';

const DataObjectsTableTextCell = ({ content }) => (
  <Truncate
    text={content}
    title={content}
  />
);

export default DataObjectsTableTextCell;
