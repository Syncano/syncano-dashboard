import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setAdmins: {},
    fetchAdmins: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Admins.list'
    },
    updateAdmin: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Admins.update'
    },
    removeAdmins: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Admins.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
