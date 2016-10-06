/* eslint-disable */
import Syncano from 'syncano';
import _ from 'lodash';

export default {
  list() {
    const accountKey = SYNCANO_DEMO_APPS_ACCOUNT_KEY;
    const connection = Syncano({
      accountKey,
      baseUrl: SYNCANO_BASE_URL
    })

    connection
      .Instance
      .please()
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  install(payload) {
    const { email, instanceName } = payload;
    const accountKey = SYNCANO_DEMO_APPS_ACCOUNT_KEY;
    const connection = Syncano({
      accountKey,
      baseUrl: SYNCANO_BASE_URL,
      defaults: {
        instanceName
      }
    });
    const invitationParams = {
      instanceName,
      email,
      role: 'read'
    }

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
          .accept(invitationToAccept.key)
      })
      .then(this.completed)
      .catch(this.failure);
  }
};
