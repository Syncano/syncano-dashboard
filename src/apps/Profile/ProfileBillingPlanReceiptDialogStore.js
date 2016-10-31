import Reflux from 'reflux';

import { DialogStoreMixin } from '../../mixins';

import ProfileBillingPlanReceiptDialogActions from './ProfileBillingPlanReceiptDialogActions';

export default Reflux.createStore({
  listenables: ProfileBillingPlanReceiptDialogActions,

  mixins: [DialogStoreMixin],

  init() {
    this.data = {};
  }
});
