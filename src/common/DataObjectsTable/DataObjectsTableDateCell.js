import React from 'react';
import Moment from 'moment';

const DataObjectsTableDateCell = ({ value }) => {
  if (!value) {
    return null;
  }

  const date = Moment(value).format('DD/MM/YYYY');
  const time = Moment(value).format('LTS');

  return (
    <div title={`${date} ${time}`}>
      {date}
    </div>
  );
};

export default DataObjectsTableDateCell;
