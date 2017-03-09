import React from 'react';

const DataObjectsTableReferenceCell = ({ content }) => (
  <div>{`${content.target}: ${content.value}`}</div>
);

export default DataObjectsTableReferenceCell;
