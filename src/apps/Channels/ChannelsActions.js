import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setChannels: {},
    fetchChannels: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Channels.list'
    }
  }
);
