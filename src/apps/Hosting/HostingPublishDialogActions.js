import CreateActions from '../../utils/ActionsConstructor.js';

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
