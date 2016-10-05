import Reflux from 'reflux';
import { DialogStoreMixin } from '../../../mixins';
import APNSPushNotificationsSummaryDialogActions from './APNSPushNotificationsSummaryDialogActions';

export default Reflux.createStore({
  listenables: APNSPushNotificationsSummaryDialogActions,
  mixins: [DialogStoreMixin]
});
