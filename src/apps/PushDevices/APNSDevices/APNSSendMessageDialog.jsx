import Actions from './APNSSendMessagesActions';
import Store from './APNSSendMessagesDialogStore';
import DevicesStore from './APNSDevicesStore';

import SendMessageDialog from '../SendMessageDialog';

const props = {
  getDevices: DevicesStore.getDevices,
  getCheckedItems: DevicesStore.getCheckedItems,
  onSendMessage: Actions.sendMessagesToAPNS,
  phoneIcon: require('./phone-apple-empty-screen.svg')
};

export default SendMessageDialog(Store, props);
