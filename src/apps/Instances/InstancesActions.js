import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setInstances: {},
    setClickedInstance: {},
    nextStep: {},
    fetchInstances: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Instances.list'
    },
    createInstance: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Instances.create'
    },
    updateInstance: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Instances.update'
    },
    removeInstances: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Instances.remove'
    },
    removeSharedInstance: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Instances.removeShared'
    }
  },
  {
    withDialog: true,
    withCheck: true
  }
);
