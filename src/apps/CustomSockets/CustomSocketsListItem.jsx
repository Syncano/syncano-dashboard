import React from 'react';
import { Link, withRouter } from 'react-router';

import { MenuItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList } from '../../common/';

const Column = ColumnList.Column;

const CustomSocketsListItem = ({ item, showDeleteDialog, params }) => {
  const { metadata } = item;
  const docsLink = `/instances/${params.instanceName}/sockets/docs${item.name}/`;
  const endpointsLink = `/instances/${params.instanceName}/endpoints/scripts/${item.name}/`;
  const metaIcon = metadata && metadata.icon ? metadata.icon : 'socket-custom-socket';
  const metaBackground = metadata && metadata.color ? metadata.color : Colors.purple400;
  const styles = {
    checkIcon: {
      cursor: 'default'
    }
  };

  // Below will be usefull when backend allow to edit installed Custom Socket
  // const showDialog = () =>
  // Actions.showDialog({ ...item, instanceName: params.instanceName, initialName: item.name });

  return (
    <ColumnList.Item key={item.name} >
      <Column.CheckIcon.Socket
        checkable={false}
        iconClassName={metaIcon}
        iconColor={metaBackground}
        primaryText={item.name}
        style={styles.checkIcon}
      />
      <Column.Desc className="col-flex-2">
        {item.description}
      </Column.Desc>
      <Column.Desc className="col-flex-1">
        <Link to={{ pathname: docsLink }}>
          Documentation
        </Link>
      </Column.Desc>
      <Column.Desc className="col-flex-1">
        <Link to={{ pathname: endpointsLink }}>
          Endpoints
        </Link>
      </Column.Desc>
      <Column.Menu data-e2e={`${item.name}-custom-sockets-options-menu`}>
        <MenuItem
          className="dropdown-item-delete"
          onTouchTap={showDeleteDialog}
          primaryText="Delete"
        />
      </Column.Menu>
    </ColumnList.Item>
  );
};

CustomSocketsListItem.propTypes = {
  showDeleteDialog: React.PropTypes.func.isRequired
};

export default withRouter(CustomSocketsListItem);
