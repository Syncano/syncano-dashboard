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
      currentOrderBy: null,
      currentPage: 1,
      isLoading: true,
      items: [],
      pagesCount: null,
      selectedRows: []
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
    const { currentPage, currentOrderBy } = this.data;

    DataObjectsActions.getDataObjectsCount();

    if (!currentOrderBy) {
      DataObjectsActions.fetchDataObjects(currentPage);
    } else {
      DataObjectsActions.fetchDataObjects(currentPage, currentOrderBy);
    }
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

  onGetDataObjectsCountCompleted({ objects_count }) {
    this.data.pagesCount = _.ceil(objects_count / 100);
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
  },

  onGoToPage(page) {
    this.data.currentPage = page;
    this.refreshDataObjects();
  },

  onSelectSorting(field) {
    let newField = field;
    const { currentOrderBy } = this.data;

    if (currentOrderBy === field) {
      newField = `-${field}`;
    }

    if (currentOrderBy === `-${field}`) {
      newField = null;
    }

    this.data.currentOrderBy = newField;
    this.data.currentPage = 1;
    this.refreshDataObjects();
  }
});
