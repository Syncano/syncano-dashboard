import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setData: {},
    clearStore: {},
    setDataEndpointName: {},
    setDataEndpointClassName: {},
    fetchDataEnpointClass: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Classes.get'
    },
    fetchCurrentDataEndpoint: {
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataEndpoints.get'
    },
    fetchNextDataPage: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataEndpoints.fetchNextDataPage'
    },
    fetchData: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataEndpoints.fetchData'
    },
    removeDataObjects: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataObjects.remove'
    }
  }
);
