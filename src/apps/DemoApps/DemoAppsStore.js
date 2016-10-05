import Reflux from 'reflux';

// Utils & Mixins
import { WaitForStoreMixin, StoreLoadingMixin, StoreFormMixin, SnackbarNotificationMixin } from '../../mixins';

// Stores & Actions
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import Actions from './DemoAppsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    WaitForStoreMixin,
    StoreLoadingMixin,
    StoreFormMixin,
    SnackbarNotificationMixin
  ],

  getInitialState() {
    return {
      items: [],
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    Actions.fetchDemoApps();
  },

  onFetchDemoAppCompleted(demoApp) {
    const { appDesc, appTitle, appGithubSrc, appTutorialSrc } = demoApp.metadata;

    this.data = {
      appName: demoApp.name,
      appDesc,
      appTitle,
      appGithubSrc,
      appTutorialSrc
    };
    this.trigger(this.data);
  },

  onFetchDemoAppsCompleted(demoApps) {
    this.data.items = demoApps;
    this.trigger(this.data);
  },

  onInstallDemoAppCompleted() {
    SessionStore.getRouter().push({ name: 'sockets', params: { instanceName: this.data.appName } });
    this.setSnackbarNotification({
      autoHideDuration: null,
      onActionTouchTap: this.dismissSnackbarNotification,
      action: 'DISMISS',
      message: `Demo App ${this.data.clickedAppName} has been successfully installed`
    });
  },

  onInstallDemoAppFailure(response) {
    this.data.feedback = response.errors.email;
    this.trigger(this.data);
  }
});
