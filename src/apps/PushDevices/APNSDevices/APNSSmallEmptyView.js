import React from 'react';
import { EmptyView } from '../../../common';
import APNSDevicesActions from './APNSDevicesActions';

const APNSSmallEmptyView = () => (
  <EmptyView.Small
    handleClick={APNSDevicesActions.showDialog}
    iconClassName="synicon-cellphone-iphone"
    description="You don't have any Apple Devices yet."
    buttonLabel="Add Apple Device"
  />
);

export default APNSSmallEmptyView;
