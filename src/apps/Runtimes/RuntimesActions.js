import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    fetchScriptRuntimes: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.listRuntimes'
    }
  }
);
