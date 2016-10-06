import Reflux from 'reflux';

import { StoreLoadingMixin } from '../../mixins';

// Stores & Actions
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

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.joinTrailing(
        SessionActions.setInstance,
        this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('ChannelHistoryStore::refreshData', this.data);

    if (SessionStore.instance && this.data.channelName) {
      Actions.fetchChannelHistory(this.data.channelName);
    }
  },

  onGetChannelHistory(channelName) {
    console.debug('ChannelHistoryStore::ongetChannelHistory', channelName);
    this.data.channelName = channelName;
    this.trigger(this.data);
    this.refreshData();
  },

  setChannelHistory(channelHistory) {
    console.debug('ChannelHistoryStore::setChannelHistory');
    this.data.items = channelHistory;
    this.trigger(this.data);
  },

  onFetchChannelHistoryCompleted(channelHistory) {
    console.debug('ChannelHistoryStore::onFetchChannelHistoryCompleted', channelHistory);
    this.setChannelHistory(channelHistory.objects);
  },

  onFetchChannelHistoryFailure() {
    SessionActions.handleInvalidURL();
  }
});
