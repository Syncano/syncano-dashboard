import React from 'react';

import Actions from './APNSPushNotificationsActions';

import PushNotificationsListItem from '../PushNotificationsListItem';

export default (props) => (
  <PushNotificationsListItem
    {...props}
    name="APNS"
    label="Apple Push Notifications service (APNs)"
    icon="apple"
    clearConfig={Actions.removeCertificates}
    deviceIcon="synicon-cellphone-iphone"
    showConfigDialog={Actions.showDialog}
  />
);
