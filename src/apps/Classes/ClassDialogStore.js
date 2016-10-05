import Reflux from 'reflux';

import { StoreFormMixin, DialogStoreMixin, WaitForStoreMixin } from '../../mixins';

import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import ClassSummaryDialogActions from './ClassSummaryDialogActions';
import Actions from './ClassesActions';

export default Reflux.createStore({
  listenables: [
    Actions,
    SessionActions
  ],

  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    WaitForStoreMixin
  ],
  stepsCount: 2,

  getInitialState() {
    return {
      createdClass: null,
      stepIndex: 0,
      metadata: {},
      classData: {
        fieldType: 'string',
        fieldTarget: 'self',
        group_permissions: 'create_objects',
        other_permissions: 'create_objects',
        fields: [],
        isLoading: false
      }
    };
  },

  init() {
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData() {
    Actions.fetchClasses();
  },

  onSetInstance() {
    this.refreshData();
  },

  onSetStepIndex(stepIndex) {
    this.trigger({
      createdClass: this.createdClass,
      stepIndex,
      isFinished: stepIndex >= (this.stepsCount - 1),
      isLoading: false
    });
    this.refreshData();
  },

  onGetClassCompleted(payload) {
    this.trigger(payload);
  },

  onCreateClass() {
    this.trigger({ isLoading: true });
  },

  onCreateClassCompleted(createdClass) {
    console.debug('ClassDialogStore::onCreateClassCompleted');
    ClassSummaryDialogActions.showDialog();
    this.createdClass = createdClass;
    Actions.setStepIndex(1);
  },

  onCreateClassFailure() {
    this.trigger({ isLoading: false });
  },

  onUpdateClass() {
    this.trigger({ isLoading: true });
  },

  onUpdateClassCompleted(updatedClass) {
    console.debug('ClassDialogStore::onUpdateClassCompleted');
    this.createdClass = updatedClass;
    this.refreshData();
    Actions.setStepIndex(1);
    SessionStore.getRouter().push({ name: 'classes', params: SessionStore.getParams() });
  },

  onUpdateClassFailure() {
    this.trigger({ isLoading: false });
  }

});
