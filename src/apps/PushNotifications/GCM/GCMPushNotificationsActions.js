import CreateActions from '../../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setDevices: {},
    fetchGCMPushNotificationConfig: {
      asyncForm: true,
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.getGCMPushNotificationConfig'
    },
    configGCMPushNotification: {
      asyncForm: true,
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.configGCMPushNotification'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
