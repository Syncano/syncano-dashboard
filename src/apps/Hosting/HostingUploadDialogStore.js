import Reflux from 'reflux';

import { DialogStoreMixin, StoreLoadingMixin } from '../../mixins';

import HostingUploadDialogActions from './HostingUploadDialogActions';

export default Reflux.createStore({
  listenables: HostingUploadDialogActions,

  mixins: [
    DialogStoreMixin,
    StoreLoadingMixin
  ],

  init() {
    this.data = this.getInitialState();
    this.setLoadingStates();
  }
});
