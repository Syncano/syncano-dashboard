import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setHosting: {},
    fetchHosting: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Hosting.list'
    },
    createHosting: {
      asyncResult: true,
      loading: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Hosting.create'
    },
    updateHosting: {
      asyncResult: true,
      loading: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Hosting.update'
    },
    removeHostings: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Hosting.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
