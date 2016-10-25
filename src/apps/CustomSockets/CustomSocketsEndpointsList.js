import React from 'react';

import { ColumnList, Lists } from '../../common/';
import ListItem from './CustomSocketsEndpointsListItem';

const CustomSocketsEndpointsList = ({ isLoading, items, socketName }) => {
  const Column = ColumnList.Column;
  const tableHeaderStyle = {
    display: 'flex',
    justifyContent: 'center'
  };

  const renderListItem = (item) => (
    <ListItem
      key={`custom-sockets-list-item-${item.name}`}
      item={item}
      socketName={socketName}
    />
  );

  return (
    <Lists.Container className="custom-sockets-endpoints-list">
      <ColumnList.Header>
        <Column.ColumnHeader
          primary={true}
          columnName="CHECK_ICON"
          className="col-flex-3"
        >
          {`${socketName} Endpoints`}
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          className="col-flex-1"
        >
          <div style={tableHeaderStyle}>
            Method
          </div>
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          className="col-sm-3"
        >
          Script
        </Column.ColumnHeader>
        <Column.ColumnHeader
          columnName="DESC"
          className="col-sm-3"
        >
          Traces
        </Column.ColumnHeader>
      </ColumnList.Header>
      <Lists.List
        isLoading={isLoading}
        items={items}
        emptyItemContent="Add a Socket to see Endpoints"
        key="custom-sockets-endpoints-list"
        renderItem={renderListItem}
      />
    </Lists.Container>
  );
};

export default CustomSocketsEndpointsList;

