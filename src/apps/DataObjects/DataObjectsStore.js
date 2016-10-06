import Reflux from 'reflux';
import _ from 'lodash';

// Utils & Mixins
import {
  CheckListStoreMixin,
  SnackbarNotificationMixin,
  StoreFormMixin,
  StoreLoadingMixin,
  WaitForStoreMixin
} from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import DataObjectsActions from './DataObjectsActions';

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
    console.debug('DataObjectsStore::refreshData');
    DataObjectsActions.fetchCurrentClassObj(SessionStore.getParams().className);
  },

  refreshDataObjects() {
    console.debug('DataObjectsStore::refreshDataObjects', this.getCurrentClassName());
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
    console.debug('DataObjectsStore::setSelectedRows');
    this.data.selectedRows = selectedRows;
    this.trigger(this.data);
  },

  setDataObjects(items, rawData) {
    console.debug('DataObjectsStore::setDataObjects');

    this.data.hasNextPage = rawData.hasNext();

    if (!this.data.items) {
      this.data.items = [];
    }

    this.data.items = [...this.data.items, ...items];
    this.data.nextParams = rawData;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  // We know number of selected rows, now we need to get ID of the objects
  getIDsFromTable() {
    return this.data.selectedRows.map((rowNumber) => this.data.items[rowNumber].id);
  },

  onFetchCurrentClassObjCompleted(classObj) {
    console.debug('DataObjectsStore::onFetchCurrentClassObjCompleted');
    this.data.classObj = classObj;
    DataObjectsActions.setCurrentClassObj(classObj);
  },

  onFetchCurrentClassObjFailure() {
    SessionActions.handleInvalidURL();
  },

  onFetchDataObjectsCompleted({ dataObjects, rawData, users }) {
    console.debug('DataObjectsStore::onFetchDataObjectsCompleted');
    this.data.items = [];
    this.data.users = users;
    DataObjectsActions.setDataObjects(dataObjects, rawData);
  },

  onSubFetchDataObjectsCompleted({ dataObjects, users }) {
    console.debug('DataObjectsStore::onSubFetchDataObjectsCompleted');
    this.data.currentPage += 1;
    this.data.users = users;
    DataObjectsActions.setDataObjects(dataObjects, dataObjects);
  },

  onGetDataObjectCompleted(fetchedItem) {
    console.debug('DataObjectsStore::onGetDataObjectCompleted');
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
    console.debug('DataObjectsStore::onGetDataObjectFailure');
    this.setSnackbarNotification({ message: 'Data Object with this ID doesn\'t exist' });
  },

  onCreateDataObjectCompleted() {
    console.debug('DataObjectsStore::onCreateDataObjectCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshDataObjects();
  },

  onUpdateDataObjectCompleted() {
    console.debug('DataObjectsStore::onUpdateDataObjectCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshDataObjects();
  },

  onRemoveDataObjects() {
    this.data.isLoading = true;
    this.trigger(this.data);
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
