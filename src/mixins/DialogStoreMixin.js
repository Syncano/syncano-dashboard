import SyntheticUIEvent from 'react-dom/lib/SyntheticUIEvent';
import _ from 'lodash';

export default {

  isEvent(object) {
    return object instanceof SyntheticUIEvent;
  },

  isInstanceObject(object) {
    return !_.isUndefined(object) && !_.isNull(object) && !this.isEvent(object);
  },

  getInitialState() {
    return this.getInitialDialogState();
  },

  getInitialDialogState() {
    return {
      _dialogMode: 'add',
      _dialogVisible: false
    };
  },

  showDialog(instance, secondInstance) {
    console.debug('DialogStoreMixin::showDialog');
    let state = { _dialogVisible: true };

    if (this.isInstanceObject(instance)) {
      state = _.assign(state, instance, { _dialogMode: 'edit' });
    } else if (this.isInstanceObject(secondInstance)) {
      state = _.assign(state, { secondInstance });
    }

    this.trigger(state);
  },

  dismissDialog() {
    console.debug('DialogStoreMixin::dismissDialog');
    this.trigger(this.getInitialDialogState());
  }
};
