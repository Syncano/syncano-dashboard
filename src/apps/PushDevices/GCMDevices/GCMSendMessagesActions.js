import CreateActions from '../../../utils/ActionsConstructor';

export default CreateActions(
  {
    sendMessagesToGCM: {
      asyncForm: true,
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.sendMessagesToGCM'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
