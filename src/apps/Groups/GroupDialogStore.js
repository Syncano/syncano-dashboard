import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin } from '../../mixins';

// Stores & Actions
import GroupsActions from './GroupsActions';

export default Reflux.createStore({
  listenables: GroupsActions,

  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  stepsCount: 2,

  getInitialState() {
    return {
      stepIndex: 0,
      isFinished: false,
      createdGroup: null,
      isLoading: false,
      label: null
    };
  },

  init() {
    this.listenToForms();
  },

  onSetStepIndex(stepIndex) {
    this.trigger({ stepIndex, isFinished: stepIndex >= (this.stepsCount - 1) });
  },

  onCreateGroup() {
    this.trigger({ isLoading: true });
  },

  onCreateGroupCompleted(createdGroup) {
    console.debug('GroupDialogStore::onCreateGroupCompleted');
    this.trigger({ createdGroup, isLoading: false });
    GroupsActions.fetchGroups();
    GroupsActions.setStepIndex(1);
  },

  onCreateGroupFailure() {
    this.trigger({ isLoading: false });
  },

  onUpdateGroup() {
    this.trigger({ isLoading: true });
  },

  onUpdateGroupCompleted(updatedGroup) {
    console.debug('GroupDialogStore::onUpdateGroupCompleted');
    this.trigger({ createdGroup: updatedGroup, isLoading: false });
    GroupsActions.fetchGroups();
    GroupsActions.setStepIndex(1);
  },

  onUpdateGroupFailure() {
    this.trigger({ isLoading: false });
  }
});
