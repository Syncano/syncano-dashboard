import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions({
  fetch: {},
  setFlag: {},
  resetFlag: {},
  setDataSource: {},
  clearTemplate: {},
  fetchTemplate: {
    asyncResult: true,
    loading: true,
    redirectOnFailure: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Templates.get'
  },
  updateTemplate: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Templates.update'
  },
  renderTemplate: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Templates.render'
  },
  renderFromEndpoint: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Templates.renderFromEndpoint'
  }
});
