import CreateActions from '../../../utils/ActionsConstructor';

export default CreateActions(
  {
    sendMessagesToAPNS: {
      asyncForm: true,
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.sendMessagesToAPNS'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
