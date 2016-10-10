import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setInvitations: {},
    fetchInvitations: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.AccountInvitations.list'
    },
    acceptInvitations: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.AccountInvitations.accept'
    },
    declineInvitations: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.AccountInvitations.decline'
    }
  },
  {
    withCheck: true
  }
);
