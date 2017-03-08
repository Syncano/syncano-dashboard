import Actions from './GCMSendMessagesActions';
import Store from './GCMSendMessageDialogStore';
import DevicesStore from './GCMDevicesStore';

import SendMessageDialog from '../SendMessageDialog';

const props = {
  getDevices: DevicesStore.getDevices,
  getCheckedItems: DevicesStore.getCheckedItems,
  onSendMessage: Actions.sendMessagesToGCM,
  phoneIcon: require('./phone-android-empty-screen.svg')
};

export default SendMessageDialog(Store, props);
