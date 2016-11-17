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
      method: 'Syncano.Actions.CustomSocketsRegistry.list'
    },
    installSocketRegistry: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSocketsRegistry.install'
    },
    getSocketRegistry: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSocketsRegistry.get'
    },
    fetchSocketsInfo: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSocketsRegistry.fetchInfo'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
