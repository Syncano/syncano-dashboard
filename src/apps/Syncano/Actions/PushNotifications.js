export default {
  configGCMPushNotification(params = {}) {
    this.NewLibConnection
      .GCMConfig
      .please()
      .update({}, params)
      .then(this.completed)
      .catch(this.failure);
  },

  configAPNSPushNotification(params = {}) {
    this.NewLibConnection
      .APNSConfig
      .please()
      .update({}, params)
      .then(this.completed)
      .catch(this.failure);
  },

  getGCMPushNotificationConfig() {
    this.NewLibConnection
      .GCMConfig
      .please()
      .get()
      .then(this.completed)
      .catch(this.failure);
  },

  getAPNSPushNotificationConfig() {
    this.NewLibConnection
      .APNSConfig
      .please()
      .get()
      .then(this.completed)
      .catch(this.failure);
  },

  removeCertificate(params = {}) {
    this.NewLibConnection
      .APNSConfig
      .please()
      .removeCertificate(params)
      .then(this.completed)
      .catch(this.failure);
  },

  listGCMMessages() {
    const push = {};

    this.NewLibConnection
      .GCMConfig
      .please()
      .get()
      .then((config) => {
        push.config = config;

        return this.NewLibConnection.GCMDevice.please().list();
      })
      .then((devices) => {
        push.devices = devices;

        return this.NewLibConnection.GCMMessage.please().list().ordering('desc');
      })
      .then((messages) => {
        push.messages = messages;

        this.completed(push);
      })
      .catch(this.failure);
  },

  listAPNSMessages() {
    const push = {};

    this.NewLibConnection
      .APNSConfig
      .please()
      .get()
      .then((config) => {
        push.config = config;

        return this.NewLibConnection.APNSDevice.please().list();
      })
      .then((devices) => {
        push.devices = devices;

        return this.NewLibConnection.APNSMessage.please().list().ordering('desc');
      })
      .then((messages) => {
        push.messages = messages;

        this.completed(push);
      })
      .catch(this.failure);
  }
};
