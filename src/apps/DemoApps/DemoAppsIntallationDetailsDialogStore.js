import Reflux from 'reflux';
import { DialogStoreMixin } from '../../mixins';
import DemoAppsIntallationDetailsDialogActions from './DemoAppsIntallationDetailsDialogActions';

export default Reflux.createStore({
  listenables: DemoAppsIntallationDetailsDialogActions,
  mixins: [DialogStoreMixin]
});
