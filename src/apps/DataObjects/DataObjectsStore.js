import Reflux from 'reflux';
import _ from 'lodash';

import {
  CheckListStoreMixin,
  SnackbarNotificationMixin,
  StoreFormMixin,
  StoreLoadingMixin,
  WaitForStoreMixin
} from '../../mixins';

import DataObjectsActions from './DataObjectsActions';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: DataObjectsActions,

  mixins: [
    CheckListStoreMixin,
    SnackbarNotificationMixin,
    StoreFormMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      items: [],
      isLoading: true,
      selectedRows: [],
      currentPage: 1
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
    DataObjectsActions.fetchDataObjects(this.data.currentPage);
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

  getSelectedRowsLength() {
    if (this.data.selectedRows) {
      return this.data.selectedRows.length;
    }
    return null;
  },

  getSelectedRowObj(cellNumber) {
    const { id, className } = this.data.items[cellNumber];

    DataObjectsActions.getDataObject({ id, className });
  },

  getItems() {
    return this.data.items;
  },

  setSelectedRows(selectedRows) {
    this.data.selectedRows = selectedRows;
    this.trigger(this.data);
  },

  setDataObjects(items, rawData) {
    this.data.hasNextPage = rawData.hasNext();

    if (!this.data.items) {
      this.data.items = [];
    }

    this.data.items = [...this.data.items, ...items];
    this.data.nextParams = rawData;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  // we know number of selected rows, now we need to get ID of the objects
  getIDsFromTable() {
    return this.data.selectedRows.map((rowNumber) => this.data.items[rowNumber].id);
  },

  onFetchCurrentClassObjCompleted(classObj) {
    this.data.classObj = classObj;
    DataObjectsActions.setCurrentClassObj(classObj);
  },

  onFetchDataObjectsCompleted({ dataObjects, rawData, users }) {
    this.data.items = [];
    this.data.users = users;
    DataObjectsActions.setDataObjects(dataObjects, rawData);
  },

  onSubFetchDataObjects() {
    this.trigger({ isLoading: true });
  },

  onSubFetchDataObjectsCompleted({ dataObjects, users }) {
    this.data.currentPage += 1;
    this.data.users = users;
    DataObjectsActions.setDataObjects(dataObjects, dataObjects);
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
    this.setSnackbarNotification({ message: 'Data Object with this ID doesn\'t exist' });
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
    this.data.selectedRows = [];
    this.trigger(this.data);
    this.refreshDataObjects();
  },

  clearStore() {
    this.data = this.getInitialState();
  }
});
