import Reflux from 'reflux';

import { StoreFormMixin } from '../../mixins';

import ProfileActions from './ProfileActions';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: ProfileActions,

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
