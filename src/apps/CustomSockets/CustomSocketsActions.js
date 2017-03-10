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
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSockets.list'
    },
    fetchScriptEndpoints: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSockets.listSocketEndpoints'
    }
  },
  {
    withDialog: true
  }
);
