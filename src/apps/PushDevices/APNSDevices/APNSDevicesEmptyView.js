import React from 'react';
import APNSDevicesActions from './APNSDevicesActions';
import { colors as Colors } from 'material-ui/styles/';
import { EmptyView } from '../../../common';

const APNSDevicesEmptyView = () => (
  <EmptyView
    data-e2e="apns-devices-empty-list-item"
    iconClassName="synicon-cellphone-iphone"
    iconColor={Colors.indigo300}
    description=""
    title="You don’t have any iOS devices yet."
    urlLabel="iOS Devices"
    docsUrl="http://docs.syncano.io/docs/ios-push-notifications-app"
    buttonLabel="Add iOS Device"
    handleClick={APNSDevicesActions.showDialog}
  />
);

export default APNSDevicesEmptyView;
