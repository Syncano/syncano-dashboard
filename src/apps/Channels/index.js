import Channels from './Channels';
import ChannelsStore from './ChannelsStore';
import ChannelsList from './ChannelsList';
import ChannelsActions from './ChannelsActions';
import ChannelDialog from './ChannelDialog';
import ChannelDialogStore from './ChannelDialogStore';
import ChannelSendMessageDialog from './SendChannelMessageDialog';

Channels.Actions = ChannelsActions;
Channels.Store = ChannelsStore;
Channels.List = ChannelsList;
Channels.Dialog = ChannelDialog;
Channels.DialogStore = ChannelDialogStore;
Channels.SendMessageDialog = ChannelSendMessageDialog;

export default Channels;
