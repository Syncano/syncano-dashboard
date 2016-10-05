import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setApiKeys: {},
    fetchApiKeys: {
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ApiKeys.list'
    },
    createApiKey: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ApiKeys.create'
    },
    updateApiKey: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ApiKeys.update'
    },
    removeApiKeys: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ApiKeys.remove'
    },
    resetApiKey: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ApiKeys.reset'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
