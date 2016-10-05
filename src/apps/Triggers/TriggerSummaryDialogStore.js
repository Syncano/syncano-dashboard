import Reflux from 'reflux';
import { DialogStoreMixin } from '../../mixins';
import TriggerSummaryDialogActions from './TriggerSummaryDialogActions';

export default Reflux.createStore({
  listenables: TriggerSummaryDialogActions,
  mixins: [DialogStoreMixin]
});
