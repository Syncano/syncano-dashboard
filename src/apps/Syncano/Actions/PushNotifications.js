import _ from 'lodash';

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
    let APNSConfigParams = {};
    const runPromisesInSequence = (p, fn) => p.then(fn);
    const promises = [
      () => (
        this.NewLibConnection
        .APNSConfig
        .please()
        .update({}, APNSConfigParams)
        .then(this.completed)
        .catch(this.failure)
      )
    ];

    _.forEach(params.certificateTypes, (type) => {
      const certificateName = params[`${type}_certificate_name`];

      if (!certificateName) {
        promises.unshift(() => (
          this.NewLibConnection
            .APNSConfig
            .please()
            .removeCertificate({}, { [`${type}_certificate`]: true })
          )
        );
      }

      if (certificateName) {
        const typeParams = _.pickBy(params, (param, paramKey) => (
          _.startsWith(paramKey, type) && _.isObject(params[`${type}_certificate`]))
        );

        APNSConfigParams = { ...APNSConfigParams, ...typeParams };
      }
    });

    promises.reduce(runPromisesInSequence, Promise.resolve());
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

  removeCertificates() {
    const params = {
      production_certificate: true,
      development_certificate: true
    };

    this.NewLibConnection
      .APNSConfig
      .please()
      .removeCertificate({}, params)
      .then(this.completed)
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
