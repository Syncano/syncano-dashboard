import React from 'react';
import GCMSocketActions from '../../PushNotifications/GCM/GCMPushNotificationsActions';
import { colors as Colors } from 'material-ui/styles/';
import { EmptyView } from '../../../common';

const GCMNoConfigEmptyView = () => (
  <EmptyView
    iconClassName="synicon-socket-push"
    iconColor={Colors.indigo400}
    title="Google Push Notification Socket"
    urlLabel="Google Push Notification Socket"
    description=""
    docsUrl="http://docs.syncano.io/docs/push-notification-sockets-android"
    buttonLabel="Configure Google Push Notification Socket"
    handleClick={GCMSocketActions.showDialog}
  />
);

export default GCMNoConfigEmptyView;
