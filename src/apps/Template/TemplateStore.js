import Reflux from 'reflux';

import { StoreFormMixin, WaitForStoreMixin, SnackbarNotificationMixin } from '../../mixins';

import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './TemplateActions';

import _ from 'lodash';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreFormMixin,
    WaitForStoreMixin,
    SnackbarNotificationMixin
  ],

  getInitialState() {
    return {
      template: {},
      renderedTemplate: '',
      isRendering: false,
      isLoading: true,
      successValidationAction: null,
      dataSource: null
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
  },

  refreshData() {
    if (SessionStore.getParams().templateName) {
      Actions.fetchTemplate(SessionStore.getParams().templateName);
    }
  },

  getTemplate() {
    return this.data.template;
  },

  clearTemplate() {
    this.data.template = null;
    this.data.renderedTemplate = '';
  },

  setFlag(flagName, callback) {
    this.data.successValidationAction = flagName;
    this.trigger(this.data);
    if (typeof callback === 'function') {
      callback();
    }
  },

  resetFlag() {
    this.data.successValidationAction = 'update';
    this.trigger(this.data);
  },

  setDataSource(dataSource) {
    this.data.dataSource = dataSource;
  },

  saveRenderedTemplate(renderedTemplate) {
    this.data.isRendering = false;
    this.data.renderedTemplate = _.has(renderedTemplate, 'data') ? renderedTemplate.data : renderedTemplate;
    this.trigger(this.data);
  },

  onFetchTemplateCompleted(template) {
    this.data.isLoading = false;
    this.data.template = template;
    this.trigger(this.data);
  },

  onRenderTemplate() {
    this.data.isRendering = true;
    this.trigger(this.data);
  },

  onRenderTemplateCompleted(renderedTemplate) {
    this.saveRenderedTemplate(renderedTemplate);
    Actions.resetFlag();
  },

  onRenderTemplateFailure() {
    this.saveRenderedTemplate('');
    Actions.resetFlag();
  },

  onRenderFromEndpointCompleted(renderedTemplate) {
    this.saveRenderedTemplate(renderedTemplate);
  },

  onRenderFromEndpointFailure(renderedTemplate) {
    this.saveRenderedTemplate(renderedTemplate);
  },

  onUpdateTemplateCompleted(template) {
    this.data.template = template;
    this.dismissSnackbarNotification();
    if (this.data.successValidationAction === 'tabRender') {
      let { dataSource } = this.data;
      const apiKey = SessionStore.getToken();

      dataSource = dataSource.endsWith('/') ? dataSource : `${dataSource}/`;

      window.open(`${dataSource}?template_response=${template.name}&api_key=${apiKey}`, '_blank');
    }
    this.refreshData();
    Actions.resetFlag();
  },

  onUpdateTemplateFailure() {
    this.dismissSnackbarNotification();
    Actions.resetFlag();
  }
});
