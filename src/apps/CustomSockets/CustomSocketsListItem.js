import React from 'react';
import { Link, withRouter } from 'react-router';

import Actions from './CustomSocketsActions';

import { MenuItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList } from '../../common/';

const Column = ColumnList.Column;

const CustomSocketsListItem = React.createClass({

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  showDialog(item) {
    Actions.showDialog(item);
  },

  render() {
    const { item, onIconClick, showDeleteDialog, params } = this.props;
    const metadata = item.metadata;
    const docsLink = `/instances/${params.instanceName}/sockets/docs${item.name}}`;
    const endpointsLink = `/instances/${params.instanceName}/custom-sockets/${item.name}/`;
    const metaIcon = metadata && metadata.icon ? metadata.icon : 'socket-custom-socket';

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.name}
      >
        <Column.CheckIcon.Socket
          className="col-xs-12"
          id={item.name}
          iconClassName={metaIcon}
          iconColor={Colors.purple400}
          checked={item.checked}
          keyName="name"
          handleIconClick={onIconClick}
          primaryText={item.name}
          primaryTextTooltip={item.description}
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
          <Link
            to={{ pathname: endpointsLink }}
          >
            Endpoints
          </Link>
        </Column.Desc>
        <Column.Menu data-e2e={`${item.name}-custom-sockets-options-menu`}>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={this.showDialog}
            primaryText="Edit"
          />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={showDeleteDialog}
            primaryText="Delete"
          />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

export default withRouter(CustomSocketsListItem);
