import React from 'react';
import { EmptyView } from '../../../common';
import GCMSendDialogActions from '../../PushDevices/GCMDevices/GCMSendMessagesActions';

const GCMMessagesSmallEmptyView = () => (
  <EmptyView.Small
    handleClick={GCMSendDialogActions.showDialog}
    iconClassName="synicon-android"
    description="You haven't sent any message yet."
    buttonLabel="Send Message"
  />
);

export default GCMMessagesSmallEmptyView;
