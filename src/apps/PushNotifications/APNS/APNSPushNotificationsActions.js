import CreateActions from '../../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setDevices: {},
    fetchAPNSPushNotificationConfig: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.getAPNSPushNotificationConfig'
    },
    configAPNSPushNotification: {
      asyncForm: true,
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.configAPNSPushNotification'
    },
    removeCertificate: {
      asyncForm: true,
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.removeCertificate'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
