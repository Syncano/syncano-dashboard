import Reflux from 'reflux';
import _ from 'lodash';

import Actions from './TracesActions';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

import { StoreLoadingMixin } from '../../mixins';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [StoreLoadingMixin],

  getInitialState() {
    return {
      items: [],
      objectId: null,
      tracesFor: null,
      isLoading: true,
      currentObjectName: null
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
    if (!_.isEmpty(SessionStore.getInstance()) && !_.isEmpty(this.data.objectId)) {
      this.fetchTraces();
      this.fetchCurrentItem();
    }
  },

  fetchCurrentItem() {
    const fetch = {
      script: Actions.fetchCurrentScript,
      scriptEndpoint: Actions.fetchCurrentScriptEndpoint,
      trigger: Actions.fetchCurrentTrigger,
      schedule: Actions.fetchCurrentSchedule
    };

    fetch[this.data.tracesFor](this.data.objectId);
  },

  fetchTraces() {
    const fetch = {
      script: Actions.fetchScriptTraces,
      scriptEndpoint: Actions.fetchScriptEndpointTraces,
      trigger: Actions.fetchTriggerTraces,
      schedule: Actions.fetchScheduleTraces
    };

    fetch[this.data.tracesFor](this.data.objectId);
  },

  onSetCurrentObjectId(ObjectId, tracesFor) {
    this.data.objectId = ObjectId;
    this.data.tracesFor = tracesFor;
    this.refreshData();
  },

  setTraces(traces) {
    this.data.items = traces;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  saveCurrentObj(currentObjName) {
    this.data.currentObjectName = currentObjName;
    this.trigger({ currentObjectName: currentObjName });
  },

  onFetchScriptTracesCompleted(tracesObj) {
    this.setTraces(tracesObj);
  },

  onFetchScriptEndpointTracesCompleted(scriptEndpointTraces) {
    this.setTraces(scriptEndpointTraces);
  },

  onFetchTriggerTracesCompleted(triggerTraces) {
    this.setTraces(triggerTraces);
  },

  onFetchScheduleTracesCompleted(scheduleTraces) {
    this.setTraces(scheduleTraces);
  },

  onFetchCurrentScriptCompleted(currentObj) {
    this.saveCurrentObj(currentObj.label);
  },

  onFetchCurrentScriptFailure() {
    this.resetState();
  },

  onFetchCurrentScriptEndpointCompleted(currentObj) {
    this.saveCurrentObj(currentObj.name);
  },

  onFetchCurrentScriptEndpointFailure() {
    this.resetState();
  },

  onFetchCurrentTriggerCompleted(currentObj) {
    this.saveCurrentObj(currentObj.label);
  },

  onFetchCurrentTriggerFailure() {
    this.resetState();
  },

  onFetchCurrentScheduleCompleted(currentObj) {
    this.saveCurrentObj(currentObj.label);
  },

  onFetchCurrentScheduleFailure() {
    this.resetState();
  },

  resetState() {
    this.data = this.getInitialState();
    this.trigger(this.data);
  }
});
