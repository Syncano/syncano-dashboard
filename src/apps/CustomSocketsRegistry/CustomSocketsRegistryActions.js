import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    changeStep: {},
    fetch: {},
    setFilter: {},
    setSearchFilter: {},
    setCustomSocketsRegistry: {},
    fetchCustomSocketsRegistry: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSocketsRegistry.list'
    },
    installCustomSocketRegistry: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSocketsRegistry.install'
    },
    getCustomSocketRegistry: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSocketsRegistry.get'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
