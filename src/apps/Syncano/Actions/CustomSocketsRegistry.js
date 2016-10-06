/* eslint-disable */
import Syncano from 'syncano';

export default {
  list() {
    const accountKey = SYNCANO_CUSTOM_SOCKETS_REGISTRY_ACCOUNT_KEY;
    const connection = Syncano({
      accountKey,
      defaults: {
        instanceName: 'syncano_socket_registry',
        className: 'registry'
      }
    });

    connection
      .DataObject
      .please()
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  install(payload, name, install_url) {
    this.NewLibConnection
      .CustomSocket
      .please()
      .installFromUrl(payload, name, install_url)
      .then(createdCustomSocketRegistry => this.completed(createdCustomSocketRegistry, payload.instanceName))
      .catch(this.failure);
  },

  get(name, instanceName, action) {
    this.NewLibConnection
      .CustomSocket
      .please()
      .get({ instanceName, name })
      .then(createdCustomSocketRegistry => this.completed(createdCustomSocketRegistry, instanceName, action))
      .catch(this.failure);
   }
};
