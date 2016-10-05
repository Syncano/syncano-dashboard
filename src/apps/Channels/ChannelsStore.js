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

  channelTypes: [
    {
      payload: 'default',
      text: 'Default'
    },
    {
      payload: 'separate_rooms',
      text: 'Separate rooms'
    }
  ],

  channelPermissions: [
    {
      text: 'none',
      payload: 'none'
    },
    {
      text: 'subscribe',
      payload: 'subscribe'
    },
    {
      text: 'publish',
      payload: 'publish'
    }
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

  getItems() {
    return this.data.items;
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

  getChannelTypesDropdown() {
    return this.channelTypes;
  },
  getChannelPermissionsDropdown() {
    return this.channelPermissions;
  },

  refreshData() {
    console.debug('ChannelsStore::refreshData');
    Actions.fetchChannels();
  },

  setChannels(items) {
    this.data.items = items;
    this.trigger(this.data);
  },

  onRemoveChannelsCompleted(payload) {
    console.debug('ChannelsStore::onRemoveChannelsCompleted');
    this.refreshData();
    window.analytics.track('Used Dashboard Sockets API', {
      type: 'delete',
      instance: payload.instanceName,
      socketId: payload.name,
      socket: 'channel'
    });
  },

  onFetchChannelsCompleted(items) {
    console.debug('ChannelsStore::onFetchChannelsCompleted');
    Actions.setChannels(items);
  }
});
