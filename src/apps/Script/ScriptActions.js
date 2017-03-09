import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions({
  setCurrentScriptTraces: {},
  setCurrentScriptId: {},
  setCurrentScript: {},
  fetch: {},
  fetchScript: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Scripts.get'
  },
  updateScript: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Scripts.update'
  },
  runScript: {
    asyncResult: true,
    asyncForm: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Scripts.run'
  },
  fetchScriptTraces: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Scripts.listTraces'
  },
  fetchScriptTrace: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Scripts.getTrace'
  },
  fetchScriptRuntimes: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Scripts.listRuntimes'
  }
});
