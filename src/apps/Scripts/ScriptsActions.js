import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    changeStep: {},
    setScripts: {},
    setScriptTraces: {},
    setScriptRuntimes: {},
    setCurrentScriptId: {},
    fetchScripts: {
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.list'
    },
    createScript: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.create'

    },
    updateScript: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.update'

    },
    runScript: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.run'

    },
    removeScripts: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.remove'

    },
    fetchScriptTrace: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.getTrace'

    },
    fetchScriptTraces: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.listTraces'

    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
