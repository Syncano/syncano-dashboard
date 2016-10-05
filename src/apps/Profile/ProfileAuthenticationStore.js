import Reflux from 'reflux';

import { StoreFormMixin, SnackbarNotificationMixin } from '../../mixins';

import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

import Actions from './ProfileActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreFormMixin,
    SnackbarNotificationMixin
  ],

  getInitialState() {
    const account_key = SessionStore.getUser({}).account_key;

    return {
      isLoading: typeof account_key === 'undefined',
      account_key
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(SessionActions.setUser, this.setUser);
  },

  setUser() {
    this.trigger({
      isLoading: false,
      account_key: SessionStore.getUser({}).account_key
    });
  },

  onResetKeyCompleted(payload) {
    SessionActions.setUser(payload);
  },

  onChangePasswordCompleted() {
    this.setSnackbarNotification({
      message: 'Password changed successfully'
    });
    this.trigger({
      current_password: null,
      newPassword: null,
      confirmNewPassword: null
    });
  },

  onSetPasswordCompleted() {
    this.setSnackbarNotification({
      message: 'Password changed successfully'
    });
    SessionActions.fetchUser();
    this.trigger({
      current_password: null,
      newPassword: null,
      confirmNewPassword: null
    });
  }
});
