import React from 'react';
import Moment from 'moment';

const DataObjectsTableDateCell = ({ content }) => {
  const dateValue = content.value;
  const date = Moment(dateValue).format('DD/MM/YYYY');
  const time = Moment(dateValue).format('LTS');
  const title = `${date} ${time}`;

  return (
    <div title={title}>
      {date}
    </div>
  );
};

export default DataObjectsTableDateCell;
