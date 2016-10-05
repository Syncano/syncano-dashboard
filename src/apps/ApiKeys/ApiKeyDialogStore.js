import Reflux from 'reflux';

// Utils & Mixins
import { StoreFormMixin, DialogStoreMixin } from '../../mixins';

// Stores & Actions
import Actions from './ApiKeysActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState() {
    return {
      ignore_acl: false,
      allow_user_create: false,
      allow_anonymous_read: false
    };
  },

  init() {
    this.listenToForms();
  },

  onCreateApiKeyCompleted() {
    console.debug('ApiKeyDialogStore::onCreateApiKeyCompleted');
    this.dismissDialog();
    Actions.fetchApiKeys();
  },

  onUpdateApiKeyCompleted() {
    console.debug('ApiKeyDialogStore::onUpdateApiKeyCompleted');
    this.dismissDialog();
    Actions.fetchApiKeys();
  }
});
