import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin } from '../../mixins';

// Stores & Actions
import Actions from './TemplatesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  stepsCount: 2,

  getInitialState() {
    return {
      name: '',
      stepIndex: 0,
      isFinished: false,
      content_type: 'text/html'
    };
  },

  init() {
    this.listenToForms();
  },

  onCreateTemplate() {
    this.trigger({ isLoading: true });
  },

  onUpdateTemplate() {
    this.trigger({ isLoading: true });
  },

  onChangeStep(stepIndex) {
    this.trigger({ stepIndex, isFinished: stepIndex >= 1 });
  },

  onCreateTemplateCompleted(createdTemplate) {
    console.debug('TemplateDialogStore::onCreateTemplateCompleted');
    this.trigger({ isLoading: false, createdTemplate });
    Actions.changeStep(1);
    Actions.fetchTemplates();
  },

  onCreateTemplateFailure() {
    this.trigger({ isLoading: false });
  },

  onUpdateTemplateCompleted(editedTemplate) {
    this.trigger({ isLoading: false, createdTemplate: editedTemplate });
    console.debug('TemplateDialogStore::onUpdateTemplateCompleted');
    Actions.changeStep(1);
    Actions.fetchTemplates();
  },

  onUpdateTemplateFailure() {
    this.trigger({ isLoading: false });
  }
});
