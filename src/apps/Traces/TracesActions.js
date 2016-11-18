import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions({
  setCurrentObjectId: {},
  fetchScriptTraces: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Scripts.listTraces'
  },
  fetchScriptEndpointTraces: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.ScriptEndpoints.listTraces'
  },
  fetchCurrentScript: {
    asyncResult: true,
    redirectOnFailure: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Scripts.get'
  },
  fetchCurrentScriptEndpoint: {
    asyncResult: true,
    redirectOnFailure: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.ScriptEndpoints.get'
  }
});
