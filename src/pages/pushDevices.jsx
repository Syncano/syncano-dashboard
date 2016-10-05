import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import APNSDevicesActions from '../../src/apps/PushDevices/APNSDevices/APNSDevicesActions';
import GCMDevicesActions from '../../src/apps/PushDevices/GCMDevices/GCMDevicesActions';
import APNSSendMessagesActions from '../../src/apps/PushDevices/APNSDevices/APNSSendMessagesActions';
import GCMSendMessagesActions from '../../src/apps/PushDevices/GCMDevices/GCMSendMessagesActions';
import APNSDevicesStore from '../../src/apps/PushDevices/APNSDevices/APNSDevicesStore';
import GCMDevicesStore from '../../src/apps/PushDevices/GCMDevices/GCMDevicesStore';

import GCMSendMessageDialog from '../../src/apps/PushDevices/GCMDevices/GCMSendMessageDialog';
import APNSSendMessageDialog from '../../src/apps/PushDevices/APNSDevices/APNSSendMessageDialog';
import GCMConfigDialog from '../apps/PushNotifications/GCM/GCMConfigDialog';
import APNSConfigDialog from '../apps/PushNotifications/APNS/APNSConfigDialog';
import GCMDialog from '../apps/PushDevices/GCMDevices/GCMDeviceDialog';
import APNSDialog from '../apps/PushDevices/APNSDevices/APNSDeviceDialog';
import { ListItem, FontIcon, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Popover, InnerToolbar } from '../common/';

const PushDevicesPage = React.createClass({
  displayName: 'PushDevicesPage',

  contextTypes: {
    params: React.PropTypes.object,
    routes: React.PropTypes.array
  },

  mixins: [
    Reflux.connect(APNSDevicesStore, 'apnsDevices'),
    Reflux.connect(GCMDevicesStore, 'gcmDevices')
  ],

  handleAddDevice(type) {
    const addDevice = {
      'apns-devices': APNSDevicesActions.showDialog,
      'gcm-devices': GCMDevicesActions.showDialog
    };

    addDevice[type]();
    this.refs.addDevicePopover.hide();
  },

  handleSendMessages(type) {
    const sendMessages = {
      'apns-devices': APNSSendMessagesActions.showDialog,
      'gcm-devices': GCMSendMessagesActions.showDialog
    };

    sendMessages[type]();
    this.refs.sendMessagePopover.hide();
  },

  handleTouchTapToolbarButtons(event, popoverRef) {
    const { params, routes } = this.context;
    const { router } = this.props;
    const currentRouteName = routes[routes.length - 1].name;
    const showDialog = {
      sendMessagePopover: () => this.handleSendMessages(currentRouteName),
      addDevicePopover: () => this.handleAddDevice(currentRouteName)
    };

    if (router.isActive({ name: 'all-push-notification-devices', params }, true) && this.refs[popoverRef]) {
      this.refs[popoverRef].toggle(event);
    } else {
      showDialog[popoverRef]();
    }
  },

  renderAddButton() {
    const { routes } = this.context;
    const { gcmDevices, apnsDevices } = this.state;
    const hasGCMConfig = gcmDevices.hasConfig;
    const hasAPNSConfig = apnsDevices.hasConfig;
    const disableMap = {
      'all-push-notification-devices': !hasAPNSConfig && !hasGCMConfig,
      'apns-devices': !hasAPNSConfig,
      'gcm-devices': !hasGCMConfig
    };

    return (
      <RaisedButton
        disabled={disableMap[routes[routes.length - 1].name]}
        label="Add"
        primary={true}
        style={{ marginRight: 0 }}
        onTouchTap={(event) => this.handleTouchTapToolbarButtons(event, 'addDevicePopover')}
      />
    );
  },

  renderSendMessagesButton() {
    const { routes } = this.context;
    const { gcmDevices, apnsDevices } = this.state;
    const hasGCMItems = gcmDevices.hasItems;
    const hasAPNSItems = apnsDevices.hasItems;
    const hasGCMConfig = gcmDevices.hasConfig;
    const hasAPNSConfig = apnsDevices.hasConfig;

    const disableMap = {
      'all-push-notification-devices': !((hasAPNSConfig && hasAPNSItems) || (hasGCMConfig && hasGCMItems)),
      'apns-devices': !hasAPNSItems || !hasAPNSConfig,
      'gcm-devices': !hasGCMItems || !hasGCMConfig
    };

    return (
      <RaisedButton
        disabled={disableMap[routes[routes.length - 1].name]}
        label="Send Messages"
        primary={true}
        style={{ marginRight: 0 }}
        onTouchTap={(event) => this.handleTouchTapToolbarButtons(event, 'sendMessagePopover')}
      />
    );
  },

  render() {
    const { children } = this.props;
    const { gcmDevices, apnsDevices } = this.state;
    const hasGCMConfig = gcmDevices.hasConfig;
    const hasGCMItems = gcmDevices.items && gcmDevices.items.length;
    const hasAPNSConfig = apnsDevices.hasConfig;
    const hasAPNSItems = apnsDevices.items && apnsDevices.items.length;
    const title = 'Push Notification Devices';

    return (
      <div>
        <Helmet title={title} />
        <GCMDialog />
        <APNSDialog />
        <GCMConfigDialog />
        <APNSConfigDialog />
        <GCMSendMessageDialog />
        <APNSSendMessageDialog />
        <InnerToolbar title={title}>
          {this.renderSendMessagesButton()}
          {this.renderAddButton()}
          <Popover
            ref="addDevicePopover"
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            style={{ padding: '8px 0' }}
          >
            <ListItem
              style={!hasGCMConfig && { color: '#AAA' }}
              disabled={!hasGCMConfig}
              leftIcon={
                <FontIcon
                  style={{ color: !hasGCMConfig ? '#AAA' : Colors.green400 }}
                  className="synicon-android"
                />
              }
              onTouchTap={() => this.handleAddDevice('gcm-devices')}
              primaryText="Android Device"
            />
            <ListItem
              style={!hasAPNSConfig && { color: '#AAA' }}
              disabled={!hasAPNSConfig}
              leftIcon={
                <FontIcon
                  style={{ color: !hasAPNSConfig ? '#AAA' : Colors.black }}
                  className="synicon-apple"
                />
              }
              onTouchTap={() => this.handleAddDevice('apns-devices')}
              primaryText="iOS Device"
            />
          </Popover>
          <Popover
            ref="sendMessagePopover"
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            style={{ padding: '8px 0' }}
          >
            <ListItem
              style={!hasGCMItems && { color: '#AAA' }}
              disabled={!hasGCMItems || !hasGCMConfig}
              leftIcon={
                <FontIcon
                  style={{ color: !hasGCMItems ? '#AAA' : Colors.green400 }}
                  className="synicon-android"
                />
              }
              onTouchTap={() => this.handleSendMessages('gcm-devices')}
              primaryText="Android Device"
            />
            <ListItem
              style={!hasAPNSItems && { color: '#AAA' }}
              disabled={!hasAPNSItems || !hasAPNSConfig}
              leftIcon={
                <FontIcon
                  style={{ color: !hasAPNSItems ? '#AAA' : Colors.black }}
                  className="synicon-apple"
                />
              }
              onTouchTap={() => this.handleSendMessages('apns-devices')}
              primaryText="iOS Device"
            />
          </Popover>
        </InnerToolbar>
        {children}
      </div>
    );
  }
});

export default withRouter(PushDevicesPage);
