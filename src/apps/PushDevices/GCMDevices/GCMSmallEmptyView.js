import React from 'react';
import { EmptyView } from '../../../common';
import GCMDevicesActions from './GCMDevicesActions';

const GCMSmallEmptyView = () => (
  <EmptyView.Small
    handleClick={GCMDevicesActions.showDialog}
    iconClassName="synicon-cellphone-android"
    description="You don't have any Google Devices yet."
    buttonLabel="Add Google Device"
  />
);

export default GCMSmallEmptyView;
