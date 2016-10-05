import React from 'react';

import Actions from './APNSPushNotificationsActions';

import PushNotificationsListItem from '../PushNotificationsListItem';

export default (props) => {
  const params = {
    development_certificate: false,
    development_certificate_name: null,
    development_bundle_identifier: null,
    production_certificate: false,
    production_certificate_name: null,
    production_bundle_identifier: null
  };
  const handleClearConfig = () => {
    Actions.removeCertificate(params);
  };

  return (
    <PushNotificationsListItem
      {...props}
      name="APNS"
      label="Apple Push Notifications service (APNs)"
      icon="apple"
      clearConfig={handleClearConfig}
      deviceIcon="synicon-cellphone-iphone"
      showConfigDialog={Actions.showDialog}
    />
  );
};
