import React from 'react';
import GCMDevicesActions from './GCMDevicesActions';
import { colors as Colors } from 'material-ui/styles/';
import { EmptyView } from '../../../common';

const GCMDevicesEmptyView = () => (
  <EmptyView
    data-e2e="gcm-devices-empty-list-item"
    iconClassName="synicon-cellphone-android"
    iconColor={Colors.indigo300}
    description=""
    title="You don’t have any Android Devices yet."
    urlLabel="Android Devices"
    docsUrl="http://docs.syncano.io/docs/android-push-notifications-app"
    buttonLabel="Add Android Device"
    handleClick={GCMDevicesActions.showDialog}
  />
);

export default GCMDevicesEmptyView;
