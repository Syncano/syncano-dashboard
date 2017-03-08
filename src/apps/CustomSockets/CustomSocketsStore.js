import Reflux from 'reflux';

import { StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

import SessionActions from '../Session/SessionActions';
import Actions from './CustomSocketsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreLoadingMixin,
    WaitForStoreMixin
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
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  getCustomSockets(empty) {
    return this.data.items || empty || null;
  },

  refreshData() {
    Actions.fetchCustomSockets();
  },

  onFetchCustomSocketsCompleted(response) {
    this.data.items = response.data.objects;
    this.trigger(this.data);
  }
});
