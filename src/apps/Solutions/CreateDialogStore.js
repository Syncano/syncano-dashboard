import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin, StoreHelpersMixin } from '../../mixins';

// Stores & Actions
import SessionStore from '../Session/SessionStore';
import Actions from './CreateDialogActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    StoreHelpersMixin
  ],

  getInitialState() {
    return {
      name: null,
      public: false
    };
  },

  init() {
    this.data = this.getInitialState();
    Actions.fetchTags();
    this.listenToForms();
  },

  getTagsOptions() {
    return this.getSelectOptions(this.data.allTags, 'name', 'name');
  },

  getItemTags() {
    return this.getSelectValuesFromList(this.data.tags);
  },

  onCreateSolutionCompleted(solution) {
    console.debug('SolutionDialogStore::onCreateSolutionCompleted');
    const params = {
      solutionId: solution.id
    };

    SessionStore.getRouter().push({ name: 'solutions-edit', params });
  },

  onUpdateSolutionCompleted() {
    console.debug('SolutionDialogStore::onUpdateSolutionCompleted');
    this.dismissDialog();
    Actions.fetchSolutions();
  },

  onFetchTags() {
    console.debug('SolutionsStore::onFetchTags');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchTagsCompleted(tags) {
    console.debug('SolutionsStore::onFetchTagsCompleted');
    this.data.isLoading = false;
    this.data.allTags = tags.data.objects;
    this.trigger(this.data);
  },

  onFetchTagsFailure() {
    console.debug('SolutionsStore::onFetchTagsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  }
});
