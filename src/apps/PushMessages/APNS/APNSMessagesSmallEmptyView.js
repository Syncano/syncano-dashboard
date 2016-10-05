import React from 'react';
import { EmptyView } from '../../../common';
import APNSSendDialogActions from '../../PushDevices/APNSDevices/APNSSendMessagesActions';

const APNSMessagesSmallEmptyView = () => (
  <EmptyView.Small
    handleClick={APNSSendDialogActions.showDialog}
    iconClassName="synicon-apple"
    description="You haven't sent any message yet."
    buttonLabel="Send Message"
  />
);

export default APNSMessagesSmallEmptyView;
