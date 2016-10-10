import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    stopPolling: {},
    clearMessagesHistory: {},
    changeStep: {},
    pollForChannel: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Channels.poll'
    },
    sendChannelMessage: {
      asyncResult: true,
      asyncForm: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Channels.publish'
    }
  },
  {
    withDialog: true
  }
);
