import pluralize from 'pluralize';
import _ from 'lodash';

export default {

  getKeyName(key) {
    let keyName = key;

    if (typeof keyName !== 'string') {
      keyName = 'items';
    }

    return keyName;
  },

  getNumberOfChecked(key) {
    const keyName = this.getKeyName(key);

    return this.getCheckedItems(keyName).length;
  },

  onCheckItem(checkId, value, itemKeyName = 'id', stateKeyName) {
    console.debug('CheckListStoreMixin::onCheckItem');
    const keyName = this.getKeyName(stateKeyName);

    this.data[keyName].forEach((item) => {
      if (item[itemKeyName].toString() === checkId.toString()) {
        item.checked = value;
      }
    });
    this.trigger(this.data);
  },

  onUncheckAll(key) {
    const keyName = this.getKeyName(key);

    this.data[keyName].forEach((item) => (item.checked = false));
    this.trigger(this.data);
  },

  onSelectAll(key) {
    const keyName = this.getKeyName(key);

    this.data[keyName].forEach((item) => (item.checked = true));
    this.trigger(this.data);
  },

  onSelectVisible(key, visibleItems) {
    const keyName = this.getKeyName(key);

    if (this.data[keyName].length >= visibleItems) {
      _.times(visibleItems, (index) => {
        this.data[keyName][index].checked = true;
      });
      this.trigger(this.data);
    } else {
      this.onSelectAll(keyName);
    }
  },

  getCheckedItem(key = 'items') {
    // Looking for the first 'checked' item
    let checkedItem = null;

    if (this.data[key] === null) {
      return checkedItem;
    }

    this.data[key].some((item) => {
      if (item.checked) {
        checkedItem = item;
        return true;
      }

      return false;
    });

    return checkedItem;
  },

  getCheckedItems(key) {
    const keyName = this.getKeyName(key);

    if (this.data[keyName] === null) {
      return [];
    }

    return this.data[keyName].filter((item) => item.checked);
  },

  getDeleteItemsPhrase(groupName) {
    const checkedItemsCount = this.getNumberOfChecked();

    return `${checkedItemsCount} ${pluralize(groupName, checkedItemsCount)}`;
  }
};
