import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setChannels: {},
    changeStep: {},
    fetchChannels: {
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Channels.list'
    },
    createChannel: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Channels.create'
    },
    updateChannel: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Channels.update'
    },
    removeChannels: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Channels.remove'
    }
  },
  {
    withDialog: true,
    withCheck: true
  }
);
