import React from 'react';

import APNSPushNotificationsActions from './APNS/APNSPushNotificationsActions';
import GCMPushNotificationsActions from './GCM/GCMPushNotificationsActions';

import { EmptyView } from '../../common';
import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

const PushMessagesEmptyViewDouble = () => (
  <EmptyView.Double
    iconClassName="synicon-socket-push"
    iconColor={Colors.indigo400}
    title="You haven’t configured a Push Notification Socket yet."
    labelButtonRight="Config Google Socket"
    labelButtonLeft="Config Apple Socket"
    rightIconType={<FontIcon className="synicon-android" />}
    leftIconType={<FontIcon className="synicon-apple" />}
    handleClickRightButton={GCMPushNotificationsActions.showDialog}
    handleClickLeftButton={APNSPushNotificationsActions.showDialog}
    description={
      <span>
        Instantly message your iOS or Android users with timely and relevant content. Read our
        <a href="http://docs.syncano.io/docs/push-notification-sockets-ios" target="_blank">
          {' Apple Push Notification docs '}
        </a>
        and
        <a href="http://docs.syncano.io/docs/push-notification-sockets-android" target="_blank">
          {' Google Push Notification docs '}
        </a>
        and
        to learn more.
      </span>
    }
  />
);

export default PushMessagesEmptyViewDouble;
