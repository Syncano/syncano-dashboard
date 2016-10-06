import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions({
  getChannelHistory: {},

  fetchChannelHistory: {
    asyncResult: true,
    children: ['completed', 'failure'],
    loading: true,
    method: 'Syncano.Actions.Channels.getHistory'
  },
  fetchCurrentChannel: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Channels.get'
  }
});
