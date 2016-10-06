import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    changeStep: {},
    setDataEndpoints: {},
    fetchDataEndpoints: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataEndpoints.list'
    },
    createDataEndpoint: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataEndpoints.create'
    },
    updateDataEndpoint: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataEndpoints.update'
    },
    removeDataEndpoints: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataEndpoints.remove'
    },
    createClass: {
      asyncResult: true,
      asyncForm: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Classes.create'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
