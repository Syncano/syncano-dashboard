import React from 'react';

import APNSSendDialogActions from '../PushDevices/APNSDevices/APNSSendMessagesActions';
import GCMSendDialogActions from '../PushDevices/GCMDevices/GCMSendMessagesActions';

import { EmptyView } from '../../common';
import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

const PushMessagesEmptyViewDouble = () => (
  <EmptyView.Double
    iconClassName="synicon-socket-push"
    iconColor={Colors.indigo400}
    title="You haven’t sent any Push Messages yet."
    labelButtonLeft="Send iOS Message"
    labelButtonRight="Send Android Message"
    leftIconType={<FontIcon className="synicon-apple" />}
    rightIconType={<FontIcon className="synicon-android" />}
    handleClickLeftButton={APNSSendDialogActions.showDialog}
    handleClickRightButton={GCMSendDialogActions.showDialog}
    description={
      <span>
        You can use Push Messages to inform your users about something. Read our
        <a href="http://docs.syncano.io/docs/sending-push-notifications" target="_blank"> Push Messages docs </a>
        to learn more.
      </span>
    }
  />
);

export default PushMessagesEmptyViewDouble;
