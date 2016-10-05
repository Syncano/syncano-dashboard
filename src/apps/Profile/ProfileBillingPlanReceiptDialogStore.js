import Reflux from 'reflux';

import { DialogStoreMixin } from '../../mixins';

import Actions from './ProfileBillingPlanReceiptDialogActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [DialogStoreMixin],

  init() {
    this.data = {};
  }
});
