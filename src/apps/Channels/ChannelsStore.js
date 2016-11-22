import Reflux from 'reflux';

import { CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin } from '../../mixins';

import SessionActions from '../Session/SessionActions';
import Actions from './ChannelsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
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

  getChannelsDropdown() {
    const dropdown = [{
      payload: 'no channel',
      text: 'no channel'
    }];

    return dropdown.concat(this.data.items.map((item) => ({
      payload: item.name,
      text: item.name,
      type: item.type
    })));
  },

  refreshData() {
    Actions.fetchChannels();
  },

  setChannels(items) {
    this.data.items = items;
    this.trigger(this.data);
  },

  onFetchChannelsCompleted(items) {
    Actions.setChannels(items);
  }
});
