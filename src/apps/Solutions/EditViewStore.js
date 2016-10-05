import Reflux from 'reflux';
import Promise from 'axios';

// Utils & Mixins
import { StoreFormMixin, WaitForStoreMixin } from '../../mixins';

import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './EditViewActions';
import CreateDialogActions from './CreateDialogActions';

export default Reflux.createStore({
  listenables: [
    Actions,
    CreateDialogActions
  ],

  mixins: [
    StoreFormMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      item: {
        stars_count: 0,
        tags: []
      },
      versions: [],
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData() {
    console.debug('SolutionsEditStore::refreshData');
    const { solutionId } = SessionStore.getParams();

    if (solutionId) {
      Promise.all([
        Actions.fetchSolution(solutionId),
        Actions.fetchSolutionVersions(solutionId)
      ]).then(() => {
        console.log('applyIsLoading::refreshData');
        this.data.isLoading = false;
        this.trigger(this.data);
      });
    }
  },

  getSolution() {
    return this.data.item;
  },

  setSolution(solution) {
    console.debug('SolutionsEditStore::setSolutions');
    this.data.item = solution;
    this.trigger(this.data);
  },

  setSolutionVersions(versions) {
    console.debug('SolutionsEditStore::setSolutions');

    this.data.versions = versions.objects;

    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchSolution() {
    console.debug('SolutionsEditStore::onFetchSolutions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionCompleted(solution) {
    console.debug('SolutionsEditStore::onFetchSolutionsCompleted');
    this.data.isLoading = false;
    Actions.setSolution(solution);
  },

  onFetchSolutionFailure() {
    console.debug('SolutionsEditStore::onFetchSolutionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchSolutionVersions() {
    console.debug('SolutionsEditStore::onFetchSolutionVersions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionVersionsCompleted(versions) {
    console.debug('SolutionsEditStore::onFetchSolutionVersionsCompleted');
    this.data.isLoading = false;
    Actions.setSolutionVersions(versions);
  },

  onFetchSolutionVersionsFailure() {
    console.debug('SolutionsEditStore::onFetchSolutionVersionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onRemoveSolution() {
    console.debug('SolutionsEditStore::onRemoveSolution');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onRemoveSolutionCompleted() {
    console.debug('SolutionsEditStore::onRemoveSolution');
    this.data.isLoading = false;
    SessionStore.getRouter().transitionTo('solutions');
  },

  onRemoveSolutionFailure() {
    console.debug('SolutionsEditStore::onRemoveSolutionFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onUpdateSolutionCompleted() {
    this.refreshData();
  }
});
