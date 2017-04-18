import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    changeStep: {},
    fetch: {},
    setFilter: {},
    setSearchFilter: {},
    setCurrentSocketId: {},
    setSocketsRegistry: {},
    fetchSocketsRegistry: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.SocketsRegistry.list'
    },
    installSocketRegistry: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.SocketsRegistry.install'
    },
    getSocketRegistry: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.SocketsRegistry.get'
    },
    fetchSocketsInfo: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.SocketsRegistry.fetchInfo'
    }
  },
  {
    withDialog: true
  }
);
