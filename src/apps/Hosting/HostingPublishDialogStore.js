import Reflux from 'reflux';

import { StoreFormMixin, DialogStoreMixin, StoreLoadingMixin } from '../../mixins';

import HostingPublishDialogActions from './HostingPublishDialogActions';
import HostingActions from './HostingActions';
import HostingFilesActions from './HostingFilesActions';

export default Reflux.createStore({
  listenables: HostingPublishDialogActions,

  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      isLoading: false
    };
  },

  init() {
    this.data = this.getInitialState();
    this.setLoadingStates();
    this.listenToForms();
  },

  onPublishHostingCompleted() {
    HostingActions.fetch();
    HostingFilesActions.fetch();
    this.dismissDialog();
  }
});
