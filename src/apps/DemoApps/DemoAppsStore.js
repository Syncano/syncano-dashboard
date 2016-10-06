import Reflux from 'reflux';

// Utils & Mixins
import { WaitForStoreMixin, StoreLoadingMixin, SnackbarNotificationMixin } from '../../mixins';

// Stores & Actions
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import Actions from './DemoAppsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    WaitForStoreMixin,
    StoreLoadingMixin,
    SnackbarNotificationMixin
  ],

  getInitialState() {
    return {
      clickedAppName: null,
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
    console.debug('DemoAppsStore::refreshData');
    Actions.fetchDemoApps();
  },

  onSetClickedApp(clickedAppName) {
    this.data.clickedAppName = clickedAppName;
    this.trigger(this.data);
  },

  onFetchDemoAppsCompleted(demoApps) {
    console.debug('DemoAppsStore::onFetchDemoAppsCompleted');
    this.data.items = demoApps;
    this.trigger(this.data);
  },

  onInstallDemoAppCompleted() {
    console.debug('InstallDemoAppDialogStore::onInstallDemoAppCompleted');
    SessionStore.getRouter().push({ name: 'sockets', params: { instanceName: this.data.clickedAppName } });
    this.setSnackbarNotification({
      autoHideDuration: null,
      onActionTouchTap: this.dismissSnackbarNotification,
      action: 'DISMISS',
      message: `Demo App ${this.data.clickedAppName} has been successfully installed`
    });
  }
});
