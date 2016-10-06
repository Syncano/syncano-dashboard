import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    showDialogWithPreFetch: {},
    setSolutionId: {},
    setInstances: {},
    setSolutionVersions: {},

    fetchInstances: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Instances.list'
    },
    fetchSolutionVersions: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Solutions.listVersions'
    },
    installSolution: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Solutions.install'
    },
    createInstance: {
      asyncResult: true,
      asyncForm: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Instances.create'
    }
  },
  {
    withDialog: true
  }
);
