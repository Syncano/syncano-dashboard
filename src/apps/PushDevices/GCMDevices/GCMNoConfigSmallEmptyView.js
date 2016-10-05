import React from 'react';
import { EmptyView } from '../../../common';
import GCMPushNotificationsActions from '../../PushNotifications/GCM/GCMPushNotificationsActions';

const GCMNoConfigSmallEmptyView = () => (
  <EmptyView.Small
    handleClick={GCMPushNotificationsActions.showDialog}
    iconClassName="synicon-socket-push"
    description="You haven’t configure Google Push Notification Socket yet."
    buttonLabel="Configure Google Push Notification Socket"
  />
);

export default GCMNoConfigSmallEmptyView;
