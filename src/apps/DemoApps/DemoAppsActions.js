import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},

    fetchDemoApps: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DemoApps.list'
    },

    fetchDemoApp: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DemoApps.getDetails'
    },

    installDemoApp: {
      asyncResult: true,
      loading: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DemoApps.install'
    }
  }
);
