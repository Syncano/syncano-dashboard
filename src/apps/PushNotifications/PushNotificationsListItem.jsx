import React from 'react';
import { withRouter } from 'react-router';

import { DialogsMixin } from '../../mixins';

// Components
import { MenuItem, IconButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Color, ColumnList, Dialog, Tooltip } from '../../common/';

const Column = ColumnList && ColumnList.Column;

const DeviceListItem = React.createClass({
  displayName: 'DeviceListItem',

  propTypes: {
    showConfigDialog: React.PropTypes.func.isRequired
  },

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [DialogsMixin],

  initDialogs() {
    const { isLoading, clearConfig, item } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'clearConfigDialog',
        ref: 'clearConfigDialog',
        title: `Delete ${item.name} config`,
        handleConfirm: clearConfig,
        isLoading,
        children: `Do you really want to clear ${item.name} config?`
      }
    }];
  },

  redirectToDevices() {
    const { name, router, params } = this.props;
    const devicesRedirectPath = `/instances/${params.instanceName}/push-notifications/devices/${name.toLowerCase()}`;

    router.push(devicesRedirectPath);
  },

  redirectToMessages() {
    const { name, router, params } = this.props;
    const messagesRedirectPath = `/instances/${params.instanceName}/push-notifications/messages/${name.toLowerCase()}`;

    router.push(messagesRedirectPath);
  },

  showClearConfigDialog() {
    this.showDialog('clearConfigDialog');
  },

  render() {
    const { item, deviceIcon, label, showConfigDialog } = this.props;
    const iconColor = Colors.blue400;

    return (
      <ColumnList.Item key={label}>
        {this.getDialogs()}
        <Column.CheckIcon.Socket
          id={`push-notification${label}`}
          iconClassName="socket-push"
          checkable={false}
          iconColor={Color.getColorByName('indigo', 'light')}
          primaryText={label}
        />
        <Column.Desc />
        <Column.Desc
          className="col-sm-6"
          data-e2e={`${item.name.toLowerCase()}-push-notification-config`}
        >
          <div
            style={{ color: iconColor, cursor: 'pointer', width: '100%' }}
            className="row align-center align-middle"
            onTouchTap={showConfigDialog}
          >
            <Tooltip
              label="Config Push Socket"
              horizontalPosition="center"
            >
              {item && item.hasConfig.toString()}
            </Tooltip>
          </div>
        </Column.Desc>
        <Column.Desc className="col-sm-6">
          <div
            style={{ width: '100%' }}
            className="row align-center align-middle"
          >
            <IconButton
              style={{ marginLeft: -12 }}
              iconStyle={{ color: iconColor }}
              tooltip="Go to Push Messages list"
              iconClassName="synicon-message-alert"
              onTouchTap={this.redirectToMessages}
            />
          </div>
        </Column.Desc>
        <Column.Desc
          data-e2e="push-notification-device-list"
          className="col-sm-4"
        >
          <div
            style={{ width: '100%' }}
            className="row align-center align-middle"
          >
            <IconButton
              data-e2e={`push-notification-devices-link-icon-${item.name}`}
              tooltip="Go to Devices list"
              iconStyle={{ color: iconColor }}
              iconClassName={deviceIcon}
              onTouchTap={this.redirectToDevices}
            />
            {item && item.devicesCount}
          </div>
        </Column.Desc>
        <Column.Desc />
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={showConfigDialog}
            primaryText="Edit"
          />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.showClearConfigDialog}
            primaryText="Delete"
          />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

export default withRouter(DeviceListItem);
