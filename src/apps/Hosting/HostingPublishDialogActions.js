import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    publishHosting: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Hosting.publish'
    }
  },
  {
    withDialog: true
  }
);
