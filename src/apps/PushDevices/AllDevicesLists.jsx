import React from 'react';
import Reflux from 'reflux';

import APNSDevicesStore from './APNSDevices/APNSDevicesStore';
import APNSDevicesActions from './APNSDevices/APNSDevicesActions';
import GCMDevicesStore from './GCMDevices/GCMDevicesStore';
import GCMDevicesActions from './GCMDevices/GCMDevicesActions';

import { Show } from '../../common';

import APNSDevices from './APNSDevices/APNSDevices';
import GCMDevices from './GCMDevices/GCMDevices';
import APNSSmallEmptyView from './APNSDevices/APNSSmallEmptyView';
import GCMSmallEmptyView from './GCMDevices/GCMSmallEmptyView';
import PushDevicesEmptyViewDouble from './PushDevicesEmptyViewDouble';
import APNSNoConfigSmallEmptyView from './APNSDevices/APNSNoConfigSmallEmptyView';
import GCMNoConfigSmallEmptyView from './GCMDevices/GCMNoConfigSmallEmptyView';
import PushNotificationsEmptyViewDouble from '../PushNotifications/PushNotificationsEmptyViewDouble';

const AllDevicesList = React.createClass({
  displayName: 'AllDevicesList',

  mixins: [
    Reflux.connect(APNSDevicesStore, 'apnsDevices'),
    Reflux.connect(GCMDevicesStore, 'gcmDevices')
  ],

  componentDidMount() {
    APNSDevicesActions.fetch();
    GCMDevicesActions.fetch();
  },

  renderDoubleEmptyViews() {
    const { apnsDevices, gcmDevices } = this.state;
    const hasBothConfigsEmpty = !apnsDevices.hasConfig && !gcmDevices.hasConfig;
    const hasBothConfigs = apnsDevices.hasConfig && gcmDevices.hasConfig;
    const hasBothListsEmpty = !apnsDevices.hasItems && !gcmDevices.hasItems;
    const shouldShowDoubleEmptyView = hasBothConfigs && hasBothListsEmpty;

    if (hasBothConfigsEmpty) {
      return <PushNotificationsEmptyViewDouble />;
    }

    if (shouldShowDoubleEmptyView) {
      return <PushDevicesEmptyViewDouble />;
    }

    return null;
  },

  render() {
    const { apnsDevices, gcmDevices } = this.state;
    const shouldShowTitle = !this.renderDoubleEmptyViews();

    return (
      <div>
        {this.renderDoubleEmptyViews()}

        <Show if={!this.renderDoubleEmptyViews()}>
          <APNSDevices
            titleVisible={shouldShowTitle || apnsDevices.isLoading}
            noConfigView={<APNSNoConfigSmallEmptyView />}
            emptyView={<APNSSmallEmptyView />}
            visibleItems={3}
          />
          <div style={{ marginTop: '-90px' }}>
            <GCMDevices
              titleVisible={shouldShowTitle || gcmDevices.isLoading}
              noConfigView={<GCMNoConfigSmallEmptyView />}
              emptyView={<GCMSmallEmptyView />}
              visibleItems={3}
            />
          </div>
        </Show>
      </div>
    );
  }
});

export default AllDevicesList;
