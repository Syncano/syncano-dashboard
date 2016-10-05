import Reflux from 'reflux';

import { StoreLoadingMixin } from '../../mixins';

import Actions from './ChannelHistoryActions';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [StoreLoadingMixin],

  getInitialState() {
    return {
      items: [],
      channelName: null,
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();

    // we want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.joinTrailing(
        SessionActions.setInstance,
        this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    if (SessionStore.instance && this.data.channelName) {
      Actions.fetchChannelHistory(this.data.channelName);
    }
  },

  onGetChannelHistory(channelName) {
    this.data.channelName = channelName;
    this.trigger(this.data);
    this.refreshData();
  },

  setChannelHistory(channelHistory) {
    this.data.items = channelHistory;
    this.trigger(this.data);
  },

  onFetchChannelHistoryCompleted(channelHistory) {
    this.setChannelHistory(channelHistory.objects);
  }
});
