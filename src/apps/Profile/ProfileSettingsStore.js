import Reflux from 'reflux';

import { StoreFormMixin } from '../../mixins';

import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import Actions from './ProfileActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [StoreFormMixin],

  getInitialState() {
    const user = SessionStore.getUser({});

    return {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenTo(SessionStore, this.checkSession);
    this.listenToForms();
  },

  checkSession(Session) {
    console.debug('ProfileSettingsStore:checkSession');
    if (Session.isReady()) {
      const user = SessionStore.getUser({});

      this.trigger({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
    }
  },

  onUpdateSettingsCompleted(payload) {
    SessionActions.setUser(payload);

    this.trigger({
      feedback: 'Profile saved successfully.'
    });
  }
});
