/* eslint-disable no-undef, consistent-return  */
import Syncano from 'syncano';
import _ from 'lodash';

export default {
  fetchInfo(id) {
    const accountKey = SYNCANO_CUSTOM_SOCKETS_REGISTRY_ACCOUNT_KEY;
    let socketObj = null;
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
      .then((sockets) => {
        const socket = _.find(sockets, ['id', Number(id)]);

        if (socket) {
          return this.Promise
            .get(socket.url)
            .then((socketDataObject) => {
              const { url } = socket;
              const licenseFileUrl = `${url.slice(0, _.lastIndexOf(url, '/'))}/LICENSE`;

              socketDataObject.license = 'N/A';
              socketDataObject.ymlUrl = url;
              socketObj = socketDataObject;

              this.Promise
                .get(licenseFileUrl)
                .then((licenseFile) => {
                  socketDataObject.license = licenseFile.data.split(' ')[0];
                  this.completed(socketObj);
                })
                .catch(() => this.completed(socketObj));
            });
        }
      })
      .catch(this.failure);
  },

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
      .then((createdCustomSocketRegistry) => this.completed(createdCustomSocketRegistry, payload.instanceName))
      .catch(this.failure);
  },

  get(name, instanceName, action) {
    this.NewLibConnection
      .CustomSocket
      .please()
      .get({ instanceName, name })
      .then((createdCustomSocketRegistry) => this.completed(createdCustomSocketRegistry, instanceName, action))
      .catch(this.failure);
  }
};
