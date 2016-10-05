import _ from 'lodash';
import localStorage from 'local-storage-fallback';

export default {
  autosaveTimer: null,

  componentWillMount() {
    if (!this.mixinsConfig.autosaveAttributeName) {
      throw Error("Missing attribute: 'autosaveAttributeName'");
    }
    if (!_.has(localStorage, this.mixinsConfig.autosaveAttributeName)) {
      localStorage.setItem(this.mixinsConfig.autosaveAttributeName, true);
    }
  },

  componentWillUnmount() {
    this.clearAutosaveTimer();
  },

  getInitialState() {
    return {
      autosaveTimer: null
    };
  },

  isAutosaveEnabled() {
    return JSON.parse(localStorage.getItem(this.mixinsConfig.autosaveAttributeName));
  },

  saveCheckboxState(event, checked) {
    localStorage.setItem(this.mixinsConfig.autosaveAttributeName, checked);
    this.forceUpdate();
  },

  runAutoSave(delay = 3000) {
    this.clearAutosaveTimer();
    if (!this.isSaved() && this.refs.autosaveCheckbox && this.refs.autosaveCheckbox.isChecked()) {
      this.setAutosaveTimer(delay);
    }
  },

  clearAutosaveTimer() {
    clearTimeout(this.autosaveTimer);
  },

  setAutosaveTimer(delay = 3000) {
    this.autosaveTimer = setTimeout(this.handleUpdate, delay);
  },

  areEditorsLoaded() {
    const { editorRefs } = this.mixinsConfig;

    return !_.some(editorRefs, (ref) => _.isUndefined(this.refs[ref]));
  }
};
