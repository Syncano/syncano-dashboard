import React from 'react';
import Reflux from 'reflux';

import GCMMessagesStore from './GCM/GCMMessagesStore';
import GCMMessagesActions from './GCM/GCMMessagesActions';
import APNSMessagesStore from './APNS/APNSMessagesStore';
import APNSMessagesActions from './APNS/APNSMessagesActions';

import { Show } from '../../common';

import APNSMessagesList from './APNS/APNSMessagesList';
import GCMMessagesList from './GCM/GCMMessagesList';
import GCMMessagesSmallEmptyView from './GCM/GCMMessagesSmallEmptyView';
import APNSMessagesSmallEmptyView from './APNS/APNSMessagesSmallEmptyView';
import PushMessagesEmptyViewDouble from './PushMessagesEmptyViewDouble';

import APNSDevicesSmallEmptyView from '../PushDevices/APNSDevices/APNSSmallEmptyView';
import GCMNoDevicesSmallEmptyView from '../PushDevices/GCMDevices/GCMSmallEmptyView';
import PushDevicesEmptyViewDouble from '../PushDevices/PushDevicesEmptyViewDouble';
import APNSNoConfigSmallEmptyView from '../PushDevices/APNSDevices/APNSNoConfigSmallEmptyView';
import GCMNoConfigSmallEmptyView from '../PushDevices/GCMDevices/GCMNoConfigSmallEmptyView';
import PushNotificationsEmptyViewDouble from '../PushNotifications/PushNotificationsEmptyViewDouble';

export default React.createClass({
  displayName: 'AllPushMessagesList',

  mixins: [
    Reflux.connect(APNSMessagesStore, 'apnsMessages'),
    Reflux.connect(GCMMessagesStore, 'gcmMessages')
  ],

  componentDidMount() {
    APNSMessagesActions.fetch();
    GCMMessagesActions.fetch();
  },

  renderDoubleEmptyViews() {
    const { gcmMessages, apnsMessages } = this.state;
    const hasBothMessagesEmpty = !apnsMessages.hasMessages && !gcmMessages.hasMessages;
    const hasBothConfigsEmpty = !apnsMessages.hasConfig && !gcmMessages.hasConfig;
    const hasBothConfigs = apnsMessages.hasConfig && gcmMessages.hasConfig;
    const hasBothDevicesEmpty = !apnsMessages.hasDevices && !gcmMessages.hasDevices;
    const hasBothDevices = apnsMessages.hasDevices && gcmMessages.hasDevices;
    const shouldShowDevicesDouble = hasBothConfigs && hasBothDevicesEmpty;
    const shouldShowMessagesDouble = hasBothConfigs && hasBothDevices && hasBothMessagesEmpty;

    if (hasBothConfigsEmpty) {
      return <PushNotificationsEmptyViewDouble />;
    }

    if (shouldShowDevicesDouble) {
      return <PushDevicesEmptyViewDouble />;
    }

    if (shouldShowMessagesDouble) {
      return <PushMessagesEmptyViewDouble />;
    }

    return null;
  },

  render() {
    const { apnsMessages, gcmMessages } = this.state;
    const shouldShowTitle = !this.renderDoubleEmptyViews();

    return (
      <div>
        {this.renderDoubleEmptyViews()}

        <Show if={!this.renderDoubleEmptyViews()}>
          <APNSMessagesList
            titleVisible={shouldShowTitle || apnsMessages.isLoading}
            noConfigView={<APNSNoConfigSmallEmptyView />}
            noDevicesView={<APNSDevicesSmallEmptyView />}
            emptyView={<APNSMessagesSmallEmptyView />}
          />
          <div style={{ marginTop: '-90px' }}>
            <GCMMessagesList
              titleVisible={shouldShowTitle || gcmMessages.isLoading}
              noConfigView={<GCMNoConfigSmallEmptyView />}
              noDevicesView={<GCMNoDevicesSmallEmptyView />}
              emptyView={<GCMMessagesSmallEmptyView />}
            />
          </div>
        </Show>
      </div>
    );
  }
});
