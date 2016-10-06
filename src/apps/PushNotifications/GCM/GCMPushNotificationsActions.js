import CreateActions from '../../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setDevices: {},
    fetchGCMPushNotificationConfig: {
      loading: true,
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.getGCMPushNotificationConfig'
    },
    configGCMPushNotification: {
      asyncResult: true,
      asyncForm: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.configGCMPushNotification'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
