import React from 'react';
import APNSSocketActions from '../../PushNotifications/APNS/APNSPushNotificationsActions';
import { colors as Colors } from 'material-ui/styles/';
import { EmptyView } from '../../../common';

const APNSNoConfigEmptyView = () => (
  <EmptyView
    iconClassName="synicon-socket-push"
    iconColor={Colors.indigo400}
    title="Apple Push Notification Socket"
    urlLabel="Apple Push Notification Socket"
    description=""
    docsUrl="http://docs.syncano.io/docs/push-notification-sockets-ios"
    buttonLabel="Configure Apple Push Notification Socket"
    handleClick={APNSSocketActions.showDialog}
  />
);

export default APNSNoConfigEmptyView;
