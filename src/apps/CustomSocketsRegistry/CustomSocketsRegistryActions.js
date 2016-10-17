import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    changeStep: {},
    fetch: {},
    setFilter: {},
    setSearchFilter: {},
    setCurrentSocketId: {},
    setCustomSocketsRegistry: {},
    fetchCustomSocketsRegistry: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSocketsRegistry.list'
    },
    installCustomSocketRegistry: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSocketsRegistry.install'
    },
    getCustomSocketRegistry: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSocketsRegistry.get'
    },
    fetchCustomSocketsInfo: {
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
