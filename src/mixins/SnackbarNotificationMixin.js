import SnackbarNotificationActions from '../apps/SnackbarNotification/SnackbarNotificationActions';

export default {
  setSnackbarNotification(snackbar) {
    SnackbarNotificationActions.set(snackbar);
  },

  dismissSnackbarNotification() {
    SnackbarNotificationActions.dismiss();
  }
};
