import React from 'react';
import APNSSendDialogActions from '../../PushDevices/APNSDevices/APNSSendMessagesActions';
import { colors as Colors } from 'material-ui/styles/';
import { EmptyView } from '../../../common';

const APNSDevicesEmptyView = () => (
  <EmptyView
    iconClassName="synicon-apple"
    iconColor={Colors.indigo300}
    description="You have not send any iOS Messages yet."
    title="You haven’t sent any messages to iOS users yet."
    urlLabel="iOS Messages"
    docsUrl="http://docs.syncano.io/docs/ios-push-notifications-app"
    buttonLabel="Send iOS Messages"
    handleClick={APNSSendDialogActions.showDialog}
  />
);

export default APNSDevicesEmptyView;
