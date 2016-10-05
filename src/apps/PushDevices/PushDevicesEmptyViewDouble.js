import React from 'react';

import APNSDevicesActions from './APNSDevices/APNSDevicesActions';
import GCMDevicesActions from './GCMDevices/GCMDevicesActions';

import { EmptyView } from '../../common';
import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

const PushMessagesEmptyViewDouble = () => (
  <EmptyView.Double
    iconClassName="synicon-socket-push"
    iconColor={Colors.indigo400}
    title="You don't have any Push Devices yet."
    labelButtonLeft="Add iOS Device"
    labelButtonRight="Add Android Device"
    leftIconType={<FontIcon className="synicon-cellphone-iphone" />}
    rightIconType={<FontIcon className="synicon-cellphone-android" />}
    handleClickLeftButton={APNSDevicesActions.showDialog}
    handleClickRightButton={GCMDevicesActions.showDialog}
    description={
      <span>
        Add new iOS or Android Device to send notifications to your mobile users.  Read our
        <a href="http://docs.syncano.io/docs/sending-push-notifications" target="_blank"> Push Devices docs </a>
        to learn more.
      </span>
    }
  />
);

export default PushMessagesEmptyViewDouble;
