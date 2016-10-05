import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin, SnackbarNotificationMixin } from '../../mixins';

// Stores & Actions
import SessionStore from '../Session/SessionStore';
import Actions from './InstallDialogActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    SnackbarNotificationMixin
  ],

  getInitialState() {
    return {
      instances: null,
      versions: [
        { payload: '', text: 'Loading...' }
      ]
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
  },

  refreshState() {
    this.trigger(this);
  },

  getVersionsDropdown() {
    if (!this.data.versions) {
      return [];
    }

    return this.data.versions.map((item) => ({
      payload: item.id,
      text: item.number
    }));
  },

  getInstancesDropdown() {
    if (this.data.instances === null) {
      return [{ payload: '', text: 'Loading...' }];
    }
    return this.data.instances.map((item) => ({
      payload: item.name,
      text: item.name
    }));
  },

  setSolutionId(solutionId) {
    this.data.solutionId = solutionId;
  },

  setInstances(instances) {
    console.debug('SolutionInstallDialogStore::setInstances');
    this.data.instances = instances;

    if (instances && instances.length === 1) {
      this.data.instance = instances[0].name;
    }

    this.trigger(this.data);
  },

  setSolutionVersions(versions) {
    console.debug('SolutionInstallDialogStore::setInstances');
    this.data.versions = versions.objects;
    this.data.versions.reverse();
    this.data.version = this.data.versions[0].id;
    this.trigger(this.data);
  },

  getDefaultVersion() {
    if (this.data.versions) {
      return this.data.versions[0].number;
    }

    return null;
  },

  onFetchInstancesCompleted(items) {
    console.debug('SolutionInstallDialogStore::onFetchInstancesCompleted');
    Actions.setInstances(items);
  },

  onFetchSolutionVersions() {
    console.debug('SolutionInstallDialogStore::onFetchSolutionVersions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionVersionsCompleted(versions) {
    console.debug('SolutionInstallDialogStore::onFetchSolutionVersionsCompleted');
    this.data.isLoading = false;
    Actions.setSolutionVersions(versions);
  },

  onFetchSolutionVersionsFailure() {
    console.debug('SolutionInstallDialogStore::onFetchSolutionVersionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onShowDialogWithPreFetch(solutionId, versionId) {
    console.debug('SolutionInstallDialogStore::onShowDialogWithPreFetch', solutionId);
    this.data = this.getInitialState();
    Actions.setSolutionId(solutionId);

    if (versionId) {
      this.data.version = versionId;
      this.data.hideVersionPicker = true;
    } else {
      Actions.fetchSolutionVersions(solutionId);
    }

    Actions.fetchInstances();
    Actions.showDialog();
  },

  onInstallSolution() {
    console.debug('SolutionInstallDialogStore::onInstallSolution');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onInstallSolutionCompleted(payload) {
    console.debug('SolutionInstallDialogStore::onFetchSolutionVersionsCompleted');
    this.data.isLoading = false;
    SessionStore.getRouter().push({ name: 'instance', params: { instanceName: payload.instance } });
    this.setSnackbarNotification({
      delay: true,
      message: 'Solution successfully installed',
      action: 'dismiss',
      onActionTouchTap: () => {
        this.dismissSnackbarNotification();
      }
    });
  },

  onInstallSolutionFailure() {
    console.debug('SolutionInstallDialogStore::onFetchSolutionVersionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  }
});
