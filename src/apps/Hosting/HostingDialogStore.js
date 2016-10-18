import Reflux from 'reflux';
import { StoreFormMixin, DialogStoreMixin } from '../../mixins';
import HostingActions from './HostingActions';

export default Reflux.createStore({
  listenables: HostingActions,

  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  init() {
    this.listenToForms();
  },

  onCreateHostingCompleted() {
    this.dismissDialog();
    HostingActions.fetchHostings();
  },

  onUpdateHostingCompleted() {
    this.dismissDialog();
    HostingActions.fetchHostings();
  }
});
