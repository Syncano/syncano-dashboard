import Reflux from 'reflux';

import { StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

import SessionActions from '../Session/SessionActions';
import Actions from './CustomSocketsEndpointsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      isLoading: true,
      items: []
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      Actions.setCurrentCustomSocketName,
    );
    this.setLoadingStates();
  },

  onListSocketEndpointsCompleted(response) {
    const endpoints = response.data.objects;

    this.trigger({ isLoading: false, items: endpoints });
  }
});
