import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    changeStep: {},
    fetch: {},
    setFilter: {},
    setSearchFilter: {},
    setCurrentSocketId: {},
    setSockets: {},
    fetchSockets: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Sockets.list'
    },
    installSocket: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Sockets.install'
    },
    getSocket: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Sockets.get'
    },
    fetchSocketsInfo: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Sockets.fetchInfo'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);

