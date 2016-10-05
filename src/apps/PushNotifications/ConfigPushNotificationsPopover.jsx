import React from 'react';

import GCMActions from './GCM/GCMPushNotificationsActions';
import GCMStore from './GCM/GCMPushNotificationsStore';
import APNSActions from './APNS/APNSPushNotificationsActions';
import APNSStore from './APNS/APNSPushNotificationsStore';

import { FontIcon, ListItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Popover } from '../../common/';

export default React.createClass({
  displayName: 'ConfigPushNotificationsPopover',

  toggle(event) {
    this.refs.pushSocketPopover.toggle(event);
  },

  configurePushNotification(type) {
    const config = {
      gcm: GCMActions.showDialog,
      apns: APNSActions.showDialog
    };

    config[type]();
    this.refs.pushSocketPopover.hide();
  },

  render() {
    const hasGCMConfig = GCMStore.hasConfig();
    const hasAPNSConfig = APNSStore.hasConfig();
    const androidIcon = (
      <FontIcon
        color={Colors.green400}
        className="synicon-android"
      />
    );
    const appleIcon = (
      <FontIcon
        color={Colors.black}
        className="synicon-apple"
      />
    );
    const doneIcon = (
      <FontIcon
        color={Colors.green400}
        className="synicon-checkbox-marked-circle"
      />
    );

    return (
      <Popover
        ref="pushSocketPopover"
        style={{ padding: '8px 0' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <ListItem
          data-e2e="gcm-socket-popover"
          primaryText="GCM Socket"
          rightIcon={hasGCMConfig ? doneIcon : null}
          disabled={GCMStore.hasConfig()}
          leftIcon={androidIcon}
          onTouchTap={() => this.configurePushNotification('gcm')}
        />
        <ListItem
          data-e2e="apns-socket-popover"
          primaryText="APNS Socket"
          rightIcon={hasAPNSConfig ? doneIcon : null}
          disabled={APNSStore.hasConfig()}
          leftIcon={appleIcon}
          onTouchTap={() => this.configurePushNotification('apns')}
        />
      </Popover>
    );
  }
});
