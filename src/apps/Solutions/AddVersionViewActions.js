import CreateActions from '../../utils/ActionsConstructor.js';

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
  fetchTriggers: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Triggers.list'
  },
  fetchSchedules: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Schedules.list'
  },
  fetchScriptEndpoints: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.ScriptEndpoints.list'
  },
  fetchScripts: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Scripts.list'
  },
  fetchChannels: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Channels.list'
  },
  fetchDataEndpoints: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.DataEndpoints.list'
  },
  createVersion: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.createVersion'
  }
});
