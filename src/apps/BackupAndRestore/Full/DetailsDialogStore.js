import Reflux from 'reflux';
import { DialogStoreMixin } from '../../../mixins';
import DetailsDialogActions from './DetailsDialogActions';

export default Reflux.createStore({
  listenables: DetailsDialogActions,
  mixins: [DialogStoreMixin]
});
