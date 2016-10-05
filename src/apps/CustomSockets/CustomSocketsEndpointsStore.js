import Reflux from 'reflux';
import _ from 'lodash';

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
      items: [],
      scriptEndpoints: [],
      currentCustomSocketName: null
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      Actions.setCurrentCustomSocketName,
      Actions.fetchScriptEndpoints.completed,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    Actions.fetchCustomSocket(this.data.currentCustomSocketName);
  },

  getScriptDetails(endpoint) {
    const { scriptEndpoints } = this.data;
    const scriptDetails = _.find(scriptEndpoints, { name: endpoint.name });

    return scriptDetails;
  },

  setCurrentCustomSocketName(customSocketName) {
    Actions.fetchScriptEndpoints();
    this.data.currentCustomSocketName = customSocketName;
  },

  onFetchCustomSocketCompleted(customSocket) {
    const socketEndpoints = _.map(customSocket.endpoints, (endpoint, key) =>
      _.map(endpoint.calls, (call) =>
        ({
          endpointName: key,
          metadata: customSocket.metadata,
          scriptEndpoint: this.getScriptDetails(call),
          ...call
        })
      )
    );

    this.trigger({ items: _.flatten(socketEndpoints), isLoading: false });
  },

  onFetchScriptEndpointsCompleted(items) {
    Actions.fetchCustomSocket(this.data.currentCustomSocketName);
    this.data.scriptEndpoints = items;
    this.trigger(this.data);
  }
});
