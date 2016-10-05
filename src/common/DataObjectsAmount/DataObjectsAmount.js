import React from 'react';
import { withRouter } from 'react-router';
import { IconButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

const DataObjectsAmount = ({ router, params, className, dataObjects, ...other }) => {
  const itemsAmount = dataObjects < 1000 ? dataObjects : `~ ${dataObjects}`;
  const styles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  };
  const redirectPath = `/instances/${params.instanceName}/classes/${className}/objects/`;
  const redirectToDataObjects = () => router.push(redirectPath);

  return (
    <div style={styles}>
      {itemsAmount}
      <div data-e2e={other['data-e2e']}>
        <IconButton
          onTouchTap={redirectToDataObjects}
          iconClassName="synicon-table"
          tooltip={<div>Data Objects in <strong>{className}</strong> Class</div>}
          iconStyle={{ color: Colors.blue400, fontSize: 18, verticalAlign: 'bottom' }}
        />
      </div>
    </div>
  );
};

export default withRouter(DataObjectsAmount);
