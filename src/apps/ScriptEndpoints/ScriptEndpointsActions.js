import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setScriptEndpoints: {},
    changeStep: {},
    fetchScriptEndpoints: {
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ScriptEndpoints.list'
    },
    createScriptEndpoint: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ScriptEndpoints.create'
    },
    createScriptEndpointWithScript: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ScriptEndpoints.createWithScript'
    },
    updateScriptEndpoint: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ScriptEndpoints.update'
    },
    updateScriptEndpointWithScript: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ScriptEndpoints.updateWithScript'
    },
    removeScriptEndpoints: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ScriptEndpoints.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
