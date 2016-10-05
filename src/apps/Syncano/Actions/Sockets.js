import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, { ordering: 'desc' });

    const { baseUrl, accountKey } = this.NewLibConnection;
    const instanceName = this.NewLibConnection.getInstanceName();
    const query = _.map(params, (value, key) => `${key}=${value}`).join('&');
    const keys = [
      'customSockets',
      'data',
      'scriptEndpoints',
      'triggers',
      'schedules',
      'channels',
      'hosting',
      'gcmPushNotifications',
      'apnsPushNotifications',
      'gcmDevices',
      'apnsDevices'
    ];
    const requests = [
      { method: 'GET', path: `/v1.1/instances/${instanceName}/sockets/?${query}` },
      { method: 'GET', path: `/v1.1/instances/${instanceName}/endpoints/data/?${query}` },
      { method: 'GET', path: `/v1.1/instances/${instanceName}/endpoints/scripts/?${query}` },
      { method: 'GET', path: `/v1.1/instances/${instanceName}/triggers/?${query}` },
      { method: 'GET', path: `/v1.1/instances/${instanceName}/schedules/?${query}` },
      { method: 'GET', path: `/v1.1/instances/${instanceName}/channels/?${query}` },
      { method: 'GET', path: `/v1.1/instances/${instanceName}/hosting/?${query}` },
      { method: 'GET', path: `/v1.1/instances/${instanceName}/push_notifications/gcm/config/?${query}` },
      { method: 'GET', path: `/v1.1/instances/${instanceName}/push_notifications/apns/config/?${query}` },
      { method: 'GET', path: `/v1.1/instances/${instanceName}/push_notifications/gcm/devices/?${query}` },
      { method: 'GET', path: `/v1.1/instances/${instanceName}/push_notifications/apns/devices/?${query}` }
    ];

    this.Promise
      .post(`${baseUrl}/v1.1/instances/${instanceName}/batch/?api_key=${accountKey}`, { requests, serialize: false })
      .then((responses) => (
        _.reduce(responses.data, (result, response, index) => {
          const key = keys[index];

          if (response.code === 200) {
            if (key === 'gcmPushNotifications' || key === 'apnsPushNotifications') {
              result[key] = response.content;
            } else {
              result[key] = response.content.objects;
            }
          } else {
            result[key] = [];
          }

          return result;
        }, {})
      ))
      .then(this.completed)
      .catch(this.failure);
  }
};
