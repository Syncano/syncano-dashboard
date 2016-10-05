import Reflux from 'reflux';
import { DialogStoreMixin } from '../../mixins';
import ClassSummaryDialogActions from './ClassSummaryDialogActions';

export default Reflux.createStore({
  listenables: ClassSummaryDialogActions,
  mixins: [DialogStoreMixin]
});
