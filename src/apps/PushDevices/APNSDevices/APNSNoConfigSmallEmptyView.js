import React from 'react';
import { EmptyView } from '../../../common';
import APNSPushNotificationsActions from '../../PushNotifications/APNS/APNSPushNotificationsActions';

const APNSNoConfigSmallEmptyView = () => (
  <EmptyView.Small
    handleClick={APNSPushNotificationsActions.showDialog}
    iconClassName="synicon-socket-push"
    description="You haven’t configure Apple Push Notification Socket yet."
    buttonLabel="Configure Apple Push Notification Socket"
  />
);

export default APNSNoConfigSmallEmptyView;
