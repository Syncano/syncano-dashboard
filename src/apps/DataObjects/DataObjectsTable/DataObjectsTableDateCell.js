import React from 'react';
import Moment from 'moment';

const DataObjectsTableDateCell = ({ content }) => {
  const date = Moment(content.value).format('DD/MM/YYYY');
  const time = Moment(content.value).format('LTS');
  const title = `${date} ${time}`;

  return (
    <div title={title}>
      {date}
    </div>
  );
};

export default DataObjectsTableDateCell;
