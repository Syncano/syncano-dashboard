import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    changeStep: {},
    setTemplates: {},
    fetchTemplates: {
      asyncResult: true,
      loading: true,
      redirectOnFailure: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Templates.list'
    },
    createTemplate: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Templates.create'
    },
    updateTemplate: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Templates.update'
    },
    removeTemplates: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Templates.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
