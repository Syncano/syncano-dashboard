import PushMessages from './PushMessages';
import PushMessagesList from './PushMessagesList';
import PushMessagesListItem from './PushMessagesListItem';
import APNSMessagesList from './APNS/APNSMessagesList';
import GCMMessagesList from './GCM/GCMMessagesList';
import AllPushMessagesList from './AllPushMessagesList';

PushMessages.List = PushMessagesList;
PushMessages.ListItem = PushMessagesListItem;
PushMessages.APNSList = APNSMessagesList;
PushMessages.GCMList = GCMMessagesList;
PushMessages.AllList = AllPushMessagesList;

export default PushMessages;
