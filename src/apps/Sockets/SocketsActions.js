import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setSockets: {},
    clearSockets: {},
    addSocketsListeners: {},
    removeSocketsListeners: {},
    fetchSockets: {
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Sockets.list'
    }
  },
  {
    withDialog: true,
    withCheck: true
  }
);
