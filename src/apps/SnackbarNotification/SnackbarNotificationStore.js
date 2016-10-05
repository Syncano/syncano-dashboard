import Reflux from 'reflux';

import SnackbarNotificationActions from './SnackbarNotificationActions';

export default Reflux.createStore({
  listenables: SnackbarNotificationActions,

  getInitialState() {
    return { snackbar: null };
  },

  init() {
    this.snackbar = null;
  },

  set(newConfig) {
    console.debug('SnackbarNotificationStore::set');

    const snackbar = {
      key: Date.now(),
      autoHideDuration: 3000,
      open: true
    };

    Object.assign(snackbar, newConfig);

    if (snackbar.delay) {
      delete snackbar.autoHideDuration;
    }

    this.snackbar = snackbar;
    this.trigger({ snackbar: this.snackbar });
  },

  dismiss() {
    console.debug('SnackbarNotificationStore::dismiss');

    if (this.snackbar === null) {
      return;
    }

    this.snackbar = null;
    // Small debounce
    setTimeout(() => this.trigger({ snackbar: this.snackbar }), 150);
  }
});
