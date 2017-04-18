import React from 'react';
import { withRouter } from 'react-router';

const DataObjectsAmount = ({ dataObjects, ...other }) => {
  const itemsAmount = dataObjects < 1000 ? dataObjects : `~ ${dataObjects}`;
  const styles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  };


  return (
    <div style={styles}>
      {itemsAmount}
      <div data-e2e={other['data-e2e']} />
    </div>
  );
};

export default withRouter(DataObjectsAmount);
