import Reflux from 'reflux';
import { DialogStoreMixin } from '../../../mixins';
import GCMSummaryDialogActions from './GCMSummaryDialogActions';

export default Reflux.createStore({
  listenables: GCMSummaryDialogActions,
  mixins: [DialogStoreMixin]
});
