import React from 'react';

import Actions from './GCMPushNotificationsActions';

import PushNotificationsListItem from '../PushNotificationsListItem';

export default (props) => {
  const params = {
    production_api_key: null,
    development_api_key: null
  };
  const handleClearConfig = () => {
    Actions.configGCMPushNotification(params);
  };

  return (
    <PushNotificationsListItem
      {...props}
      name="GCM"
      label="Google Cloud Messaging (GCM)"
      icon="android"
      clearConfig={handleClearConfig}
      deviceIcon="synicon-cellphone-android"
      showConfigDialog={Actions.showDialog}
    />
  );
};
