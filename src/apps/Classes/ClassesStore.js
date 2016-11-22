import Reflux from 'reflux';
import Promise from 'axios';
import _ from 'lodash';

import Constans from '../../constants/Constants';
import { CheckListStoreMixin, StoreHelpersMixin, WaitForStoreMixin, StoreLoadingMixin } from '../../mixins';

import Actions from './ClassesActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    StoreHelpersMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      items: [],
      clickedItem: null,
      triggers: [],
      isLoading: true
    };
  },

  sendClassAnalytics(type, payload) {
    window.analytics.track('Used Dashboard Class API', {
      type,
      instance: payload.instanceName,
      class: payload.name
    });
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    Promise.all([
      Actions.fetchClasses()
    ]).then(() => {
      this.data.isLoading = false;
      this.trigger(this.data);
    });
  },

  getItems() {
    return this.data.items;
  },

  getClickedItem() {
    return this.data.clickedItem;
  },

  getClassesDropdown(addSelf = false) {
    const items = this.data.items.map((item) => ({
      payload: item.name,
      text: item.name,
      metadata: item.metadata
    }));

    if (addSelf === true) {
      items.unshift({
        payload: 'self',
        text: 'self',
        metadata: 'self'
      });
    }

    return items;
  },

  getClassByName(className) {
    let classObj = null;

    this.data.items.some((item) => {
      if (item.name === className) {
        classObj = item;
        return true;
      }

      return false;
    });

    return classObj;
  },

  getClassFields(className) {
    let classObj = null;

    this.data.items.some((item) => {
      if (item.name === className) {
        classObj = item;
        return true;
      }

      return false;
    });

    return classObj ? classObj.schema : [];
  },

  getClassRelationFields(className) {
    const allFields = this.getClassFields(className);
    const relationFields = [];

    allFields.map((item) => {
      if (item.type === 'reference' || item.type === 'relation') {
        relationFields.push(item);
      }
    });
    return relationFields;
  },

  getClassOrderFieldsPayload(className) {
    const builtInFields = [
      {
        name: 'id',
        order_index: true
      },
      {
        name: 'created_at',
        order_index: true
      },
      {
        name: 'updated_at',
        order_index: true
      }
    ];
    const allFields = [...this.getClassFields(className), ...builtInFields];
    const orderPayload = [];

    _.forEach(allFields, (item) => {
      if (item.order_index) {
        orderPayload.push({
          text: `${item.name} (ascending)`,
          payload: item.name
        });
        orderPayload.push({
          text: `${item.name} (descending)`,
          payload: `-${item.name}`
        });
      }
    });

    return orderPayload;
  },

  getClickedItemIconColor() {
    const clickedItem = this.getClickedItem();

    if (!clickedItem) {
      return {
        color: 'indigo',
        icon: 'cloud'
      };
    }
    return {
      color: clickedItem.metadata.color,
      icon: clickedItem.metadata.icon
    };
  },

  setProtectedFromEditClasses(item) {
    const indexInProtectedFromEditArray = _.findIndex(Constans.PROTECTED_FROM_EDIT_CLASS_NAMES, { name: item.name });

    if (indexInProtectedFromEditArray > -1) {
      item.protectedFromEdit = Constans.PROTECTED_FROM_EDIT_CLASS_NAMES[indexInProtectedFromEditArray];
    }

    return item;
  },

  setProtectedFromDeleteClasses(item) {
    if (Constans.PROTECTED_FROM_DELETE_CLASS_NAMES.indexOf(item.name) > -1) {
      item.protectedFromDelete = true;
    }
    return item;
  },

  setClasses(items) {
    this.data.items = _.map(items, (item) => {
      if (_.isEmpty(item.metadata)) {
        item.metadata = { color: 'indigo', icon: 'cloud' };
      }
      return item;
    });

    if (this.data.items.length > 0) {
      this.data.items = this.data.items.map(this.setProtectedFromDeleteClasses);
      this.data.items = this.data.items.map(this.setProtectedFromEditClasses);
    }

    this.trigger(this.data);
  },

  onSetClickedClass(item) {
    this.data.clickedItem = item;
    this.trigger(this.data);
  },

  onCreateClassCompleted(payload) {
    Actions.fetchClasses();
    this.sendClassAnalytics('add', payload);
  },

  onUpdateClassCompleted(payload) {
    this.refreshData();
    this.sendClassAnalytics('edit', payload);
  },

  onFetchClassesCompleted(items) {
    Actions.setClasses(items);
  },

  onRemoveClassesCompleted(payload) {
    this.data.hideDialogs = true;
    this.refreshData();
    this.sendClassAnalytics('delete', payload);
  }
});
