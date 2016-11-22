import Reflux from 'reflux';
import _ from 'lodash';
import YAML from 'js-yaml';

import { CheckListStoreMixin, StoreLoadingMixin } from '../../mixins';

import Actions from './SocketsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      items: [],
      isLoading: true,
      currentSocket: null,
      currentSocketId: null
    };
  },

  init() {
    this.data = this.getInitialState();
    this.setLoadingStates();
  },

  getSockets(empty) {
    return this.data.items || empty || null;
  },

  getSocketById(id) {
    const { items } = this.data;

    return _.find(items, ['id', Number(id)]);
  },

  onSetCurrentSocketId(id) {
    this.data.currentSocketId = Number(id);
    this.trigger(this.data);
  },

  refreshData() {
    const { currentSocketId } = this.data;
    const currentSocket = this.getSocketById(currentSocketId);

    this.data.currentSocket = currentSocket;

    Actions.fetchSocketsInfo(currentSocket.url);
  },

  onFetchSocketsInfoCompleted({ data, license, ymlUrl }) {
    try {
      this.data.currentSocket = YAML.safeLoad(data);
      this.data.currentSocket.license = license;
      this.data.currentSocket.ymlUrl = ymlUrl;
    } catch (e) {
      this.data.currentSocket = null;
    }
    this.trigger(this.data);
  },

  onFetchSocketsInfoFailure() {
    this.data.currentSocket = null;
    this.trigger(this.data);
  },

  onFetchSocketsCompleted(items) {
    this.data.items = items;
    this.trigger(this.data);
  }
});
