import Reflux from 'reflux';
import _ from 'lodash';

import Constants from '../../constants/Constants';

import { SnackbarNotificationMixin, StoreFormMixin, StoreLoadingMixin, WaitForStoreMixin } from '../../mixins';

import DataObjectsActions from './DataObjectsActions';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: DataObjectsActions,

  mixins: [
    SnackbarNotificationMixin,
    StoreFormMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      classObj: null,
      currentPage: 1,
      currentSortingField: Constants.DATA_OBJECTS_DEFAULT_SORTING_FIELD,
      isLoading: true,
      items: [],
      pagesCount: null,
      selectedItemsIDs: [],
      users: []
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.listenToForms();
    this.setLoadingStates();
    this.listenTo(DataObjectsActions.setCurrentClassObj, this.refreshDataObjects);
  },

  refreshData() {
    DataObjectsActions.fetchCurrentClassObj(SessionStore.getParams().className);
  },

  refreshDataObjects() {
    const { currentPage, currentSortingField } = this.data;

    DataObjectsActions.getDataObjectsCount();
    DataObjectsActions.fetchDataObjects(currentPage, currentSortingField);
  },

  getCurrentClassName() {
    if (this.data.classObj) {
      return this.data.classObj.name;
    }

    return null;
  },

  getCurrentClassObj() {
    return this.data.classObj;
  },

  getSelectedRowObj(cellNumber) {
    const { id, className } = this.data.items[cellNumber];

    DataObjectsActions.getDataObject({ id, className });
  },

  setSelectedItemsIDs(selectedItemsIDs) {
    this.data.selectedItemsIDs = selectedItemsIDs;
    this.trigger(this.data);
  },

  setDataObjects(items) {
    this.data.items = items;
    this.trigger(this.data);
  },

  onFetchCurrentClassObjCompleted(classObj) {
    this.data.classObj = classObj;
    DataObjectsActions.setCurrentClassObj(classObj);
  },

  onFetchDataObjectsCompleted({ dataObjects, users }) {
    this.data.users = users;
    DataObjectsActions.setDataObjects(dataObjects);
  },

  onGetDataObjectsCountCompleted({ objects_count }) {
    const pagesCount = _.ceil(objects_count / Constants.DATA_OBJECTS_PAGE_SIZE);

    this.data.pagesCount = pagesCount;
    this.trigger(this.data);
  },

  onGetDataObjectCompleted(fetchedItem) {
    const item = _.reduce(fetchedItem, (result, val, key) => {
      let value = val;

      if (_.isObject(value) && (value.type === 'reference' || value.type === 'relation')) {
        value = value.value;
      }
      if (_.isBoolean(value)) {
        value = value.toString();
      }

      result[key] = value;
      return result;
    }, {});

    DataObjectsActions.showDialog(item);
  },

  onGetDataObjectFailure() {
    this.setSnackbarNotification({ message: 'Data Object with this ID doesn\'t exist.' });
  },

  onCreateDataObjectCompleted() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshDataObjects();
  },

  onUpdateDataObjectCompleted() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshDataObjects();
  },

  onRemoveDataObjects() {
    this.data.isLoading = true;
    this.trigger(this.data);
    this.refreshDataObjects();
  },

  onRemoveDataObjectsCompleted() {
    this.data.hideDialogs = true;
    this.data.selectedItemsIDs = [];
    this.trigger(this.data);
    this.refreshDataObjects();
  },

  clearStore() {
    this.data = this.getInitialState();
  },

  goToPage(nextPage) {
    this.data.currentPage = nextPage;
    this.refreshDataObjects();
  },

  getNextSortingField(field) {
    const { currentSortingField } = this.data;

    if (currentSortingField === field) {
      return `-${field}`;
    }

    if (currentSortingField === `-${field}`) {
      return Constants.DATA_OBJECTS_DEFAULT_SORTING_FIELD;
    }

    return field;
  },

  onSelectSortingField(field) {
    this.data.currentSortingField = this.getNextSortingField(field);
    this.data.currentPage = 1;
    this.refreshDataObjects();
  }
});
