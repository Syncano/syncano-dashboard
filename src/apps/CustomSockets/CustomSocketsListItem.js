import React from 'react';
import { Link, withRouter } from 'react-router';

import { colors as Colors } from 'material-ui/styles';
import { ColumnList } from '../../common/';

const Column = ColumnList.Column;

const CustomSocketsListItem = ({ item, params }) => {
  const { metadata } = item;
  const endpointsLink = `/instances/${params.instanceName}/my-sockets/${item.name}/`;
  const metaIcon = metadata && metadata.icon ? metadata.icon : 'socket-custom-socket';
  const metaBackground = metadata && metadata.color ? metadata.color : Colors.purple400;
  const styles = {
    checkIcon: {
      cursor: 'default'
    }
  };

  return (
    <ColumnList.Item key={item.name} >
      <Column.CheckIcon.Socket
        className="col-flex-1"
        checkable={false}
        iconClassName={metaIcon}
        iconColor={metaBackground}
        primaryText={item.name}
        style={styles.checkIcon}
      />
      <Column.Desc className="col-flex-3">
        {item.description}
      </Column.Desc>
      <Column.Desc className="col-xs-4">
        <Link to={{ pathname: endpointsLink }}>
          Endpoints
        </Link>
      </Column.Desc>
    </ColumnList.Item>
  );
};

export default withRouter(CustomSocketsListItem);
