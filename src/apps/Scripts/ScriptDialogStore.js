import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin } from '../../mixins';

// Stores & Actions
import Actions from './ScriptsActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  stepsCount: 2,

  getInitialState() {
    return {
      stepIndex: 0,
      isFinished: false,
      label: null,
      scriptData: {},
      runtimes: [
        { payload: '', text: 'Loading...' }
      ]
    };
  },

  init() {
    this.listenToForms();
  },

  onCreateScript() {
    this.trigger({ isLoading: true });
  },

  onChangeStep(stepIndex) {
    this.trigger({ stepIndex, isFinished: stepIndex >= (this.stepsCount - 1) });
  },

  onCreateScriptCompleted(createdScript) {
    console.debug('ScriptsStore::onCreateScriptCompleted');
    this.trigger({ isLoading: false, createdScript });
    Actions.changeStep(1);
    Actions.fetchScripts();
  },

  onCreateScriptFailure() {
    this.trigger({ isLoading: false });
  },

  onUpdateScript() {
    this.trigger({ isLoading: true });
  },

  onUpdateScriptCompleted(editedScript) {
    this.trigger({ isLoading: false, createdScript: editedScript });
    console.debug('ScriptDialogStore::onUpdateScriptCompleted');
    Actions.changeStep(1);
    Actions.fetchScripts();
  },

  onUpdateScriptFailure() {
    this.trigger({ isLoading: false });
  }
});
