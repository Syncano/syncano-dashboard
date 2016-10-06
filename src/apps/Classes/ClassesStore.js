import Reflux from 'reflux';
import _ from 'lodash';
import Promise from 'axios';

// Utils & Mixins
import Constans from '../../constants/Constants';
import { StoreHelpersMixin, CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin } from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './ClassesActions';
import SocketsActions from '../Sockets/SocketsActions';
import DataEndpointsActions from '../DataEndpoints/DataEndpointsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreHelpersMixin,
    CheckListStoreMixin,
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
    this.listenTo(SocketsActions.fetchSockets.completed, Actions.fetchClasses);
    this.listenTo(DataEndpointsActions.createClass.completed, Actions.fetchClasses);
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('ClassesStore::refreshData');
    Promise.all([
      Actions.fetchClasses(),
      Actions.fetchTriggers()
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
    console.debug('ClassesStore::onFetchClassesCompleted');
    Actions.setClasses(items);
  },

  onFetchTriggersCompleted(items) {
    console.debug('ClassesStore::onFetchTriggersCompleted');
    this.setTriggers(items);
  },

  setTriggers(items) {
    console.debug('ClassesStore::setTriggers');
    this.data.triggers = items;
    this.trigger(this.data);
  },

  onRemoveClassesCompleted(payload) {
    console.debug('ClassesStore::onRemoveClassesCompleted');
    this.data.hideDialogs = true;
    this.refreshData();
    this.sendClassAnalytics('delete', payload);
  }
});
