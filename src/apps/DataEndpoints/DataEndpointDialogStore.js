import Reflux from 'reflux';
import _ from 'lodash';

import { DialogStoreMixin, StoreFormMixin } from '../../mixins';

import DataEndpointsActions from './DataEndpointsActions';
import ClassesStore from '../Classes/ClassesStore';
import ClassesActions from '../Classes/ClassesActions';

import SampleSchemas from './../Classes/SampleSchemas';

export default Reflux.createStore({
  listenables: DataEndpointsActions,

  mixins: [
    DialogStoreMixin,
    StoreFormMixin
  ],

  getInitialState() {
    return {
      stepIndex: 0,
      name: '',
      class: '',
      page_size: 50,
      excluded_fields: '',
      expand: '',
      classes: ['Loading...'],
      expandFields: {},
      showFields: {},
      order_by: 'id',
      query: {}
    };
  },

  sendDataEndpointAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Sockets API', {
      type,
      instance: payload.instanceName,
      socketId: payload.name,
      socket: 'data endpoint'
    });
  },

  init() {
    this.listenToForms();
    this.listenTo(ClassesActions.setClasses, this.getClassesDropdown);
  },

  changeStep(step) {
    this.trigger({ stepIndex: step, isFinished: step >= 2 });
  },

  getClassesDropdown() {
    const userClasses = ClassesStore.getItems();
    const sampleClasses = _.toArray(SampleSchemas);
    const classes = { userClasses, sampleClasses };

    this.trigger({ classes });
  },

  getCrontabDropdown() {
    return this.crontabItems;
  },

  onCreateDataEndpoint() {
    this.trigger({ isLoading: true });
  },

  onCreateDataEndpointCompleted(dataEndpoint) {
    this.trigger({ createdDataEndpoint: dataEndpoint, isLoading: false });
    DataEndpointsActions.fetchDataEndpoints();
    DataEndpointsActions.changeStep(3);
    this.sendDataEndpointAnalytics('add', dataEndpoint);
  },

  onCreateDataEndpointFailure() {
    this.trigger({ isLoading: false });
  },

  onUpdateDataEndpoint() {
    this.trigger({ isLoading: true });
  },

  onUpdateDataEndpointCompleted(dataEndpoint) {
    this.trigger({ createdDataEndpoint: dataEndpoint, isLoading: false });
    DataEndpointsActions.fetchDataEndpoints();
    DataEndpointsActions.changeStep(3);
    this.sendDataEndpointAnalytics('edit', dataEndpoint);
  },

  onUpdateDataEndpointFailure() {
    this.trigger({ isLoading: false });
  },

  onCreateClass() {
    this.trigger({ isLoading: true });
  },

  onCreateClassCompleted(createdClass) {
    this.trigger({ createdClass, isLoading: false });
    DataEndpointsActions.changeStep(2);
  },

  onCreateClassFailure() {
    this.trigger({ isLoading: false });
  }
});
