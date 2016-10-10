import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},

    fetchGlobalConfig: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.GlobalConfig.get'
    },
    updateGlobalConfig: {
      asyncResult: true,
      loading: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.GlobalConfig.update'
    }
  },
  {
    withDialog: true
  }
);
