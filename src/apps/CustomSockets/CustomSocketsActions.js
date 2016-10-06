import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setCustomSockets: {},
    fetchCustomSockets: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSockets.list'
    },
    createCustomSocket: {
      asyncResult: true,
      loading: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSockets.create'
    },
    updateCustomSocket: {
      asyncResult: true,
      loading: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSockets.update'
    },
    removeCustomSockets: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSockets.remove'
    }
  },
  {
    withDialog: true
  }
);
