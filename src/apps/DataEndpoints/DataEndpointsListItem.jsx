import React from 'react';
import { Link, withRouter } from 'react-router';

import { SnackbarNotificationMixin } from '../../mixins';

import Actions from './DataEndpointsActions';

import { MenuItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, Clipboard } from '../../common/';

const Column = ColumnList && ColumnList.Column;

const DataEndpointsListItem = React.createClass({
  displayName: 'DataEndpointsListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  mixins: [SnackbarNotificationMixin],

  render() {
    const { item, onIconClick, showDeleteDialog, params } = this.props;

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.name}
      >
        <Column.CheckIcon.Socket
          className="col-xs-12"
          id={item.name}
          iconClassName="socket-data"
          iconColor={Colors.green400}
          checked={item.checked}
          keyName="name"
          handleIconClick={onIconClick}
          primaryText={item.name}
          primaryTextTooltip={item.description}
          secondaryText={
            <Clipboard
              text={item.links.self}
              copyText={`${APP_CONFIG.SYNCANO_BASE_URL}${item.links.get}`}
              onCopy={() => this.setSnackbarNotification({
                message: 'Data Endpoint url copied!'
              })}
              type="link"
              tooltip="Copy Data Endpoint url"
            />
          }
        />
        <Column.Desc className="col-flex-2">
          {item.description}
        </Column.Desc>
        <Column.Desc
          className="col-flex-1"
          data-e2e={`${item.name}-data-enpoint-class-name`}
        >
          {item.class}
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link to={{ pathname: `/instances/${params.instanceName}/data-endpoints/${item.name}/preview` }}>
            Preview
          </Link>
        </Column.Desc>
        <Column.Menu data-e2e={`${item.name}-data-endpoint-options-menu`}>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
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

export default withRouter(DataEndpointsListItem);
