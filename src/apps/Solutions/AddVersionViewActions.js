import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions({
  fetch: {},
  setType: {},
  setInstance: {},
  setInstances: {},
  clearExportSpec: {},
  fetchInstanceData: {},

  fetchInstances: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Instances.list'
  },
  fetchInstance: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Instances.set'
  },
  fetchClasses: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Classes.list'
  },
  fetchChannels: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Channels.list'
  },
  createVersion: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.createVersion'
  }
});
