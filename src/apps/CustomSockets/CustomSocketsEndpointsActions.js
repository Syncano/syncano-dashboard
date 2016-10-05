import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setCurrentCustomSocketName: {},
    fetchCustomSocket: {
      asyncResult: true,
      loading: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSockets.get'
    },
    fetchScriptEndpoints: {
      asyncResult: true,
      loading: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSockets.listScriptEndpoints'
    }
  }
);
