import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setCurrentCustomSocketName: {},
    listSocketEndpoints: {
      asyncResult: true,
      loading: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CustomSockets.listSocketEndpoints'
    }
  }
);
