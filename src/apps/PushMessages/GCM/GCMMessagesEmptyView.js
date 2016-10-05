import React from 'react';
import GCMSendDialogActions from '../../PushDevices/GCMDevices/GCMSendMessagesActions';
import { colors as Colors } from 'material-ui/styles/';
import { EmptyView } from '../../../common';

const GCMDevicesEmptyView = () => (
  <EmptyView
    iconClassName="synicon-android"
    iconColor={Colors.indigo300}
    description="You have not send any Android Messages yet."
    title="You haven’t sent any messages to Android users yet."
    urlLabel="Android Messages"
    docsUrl="http://docs.syncano.io/docs/android-push-notifications-app"
    buttonLabel="Send Android Messages"
    handleClick={GCMSendDialogActions.showDialog}
  />
);

export default GCMDevicesEmptyView;
