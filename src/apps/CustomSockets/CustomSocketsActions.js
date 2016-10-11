import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setCustomSockets: {},
    setClickedCustomSockets: {},
    setScriptEndpoints: {},
    fetchCustomSockets: {
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
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
    },
    fetchScriptEndpoints: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSockets.listScriptEndpoints'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
