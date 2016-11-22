import Syncano from 'syncano';
import _ from 'lodash';

const accountKey = APP_CONFIG.SYNCANO_DEMO_APPS_ACCOUNT_KEY;
const baseUrl = APP_CONFIG.SYNCANO_BASE_URL;

export default {
  list() {
    const connection = Syncano({ accountKey, baseUrl });

    connection
      .Instance
      .please()
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  getDetails(instanceName) {
    const connection = Syncano({ accountKey, baseUrl });

    connection
      .Instance
      .please()
      .get(instanceName)
      .then(this.completed)
      .catch(this.failure);
  },

  install(payload) {
    const { email, instanceName } = payload;
    const connection = Syncano({
      accountKey,
      baseUrl,
      defaults: {
        instanceName
      }
    });
    const invitationParams = {
      instanceName,
      email,
      role: 'read'
    };

    connection
      .InstanceInvitation
      .please()
      .create(invitationParams)
      .then(() => this.NewLibConnection.Invitation.please().list())
      .then((invitations) => {
        const invitationToAccept = _.find(invitations, (invitation) => invitation.instance === instanceName);

        return this.NewLibConnection
          .Invitation
          .please()
          .accept(invitationToAccept.key);
      })
      .then(this.completed)
      .catch(this.failure);
  }
};
