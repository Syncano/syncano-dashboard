import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setUsers: {},
    fetchUsers: {
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Users.list'
    },
    subFetchUsers: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Users.subList'
    },
    createUser: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Users.create'
    },
    updateUser: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Users.update'
    },
    removeUsers: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Users.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
