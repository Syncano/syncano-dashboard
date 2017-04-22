import Sockets from './Sockets';
import SocketsStore from './SocketsStore';
import SocketsList from './SocketsList';
import SocketsListItem from './SocketsListItem';
import SocketsActions from './SocketsActions';
import SocketsDialog from './SocketsDialog';
import SocketsDialogStore from './SocketsDialogStore';
import SocketsDetailsView from './DetailsView/SocketDetailsView';

Sockets.Store = SocketsStore;
Sockets.List = SocketsList;
Sockets.ListItem = SocketsListItem;
Sockets.Actions = SocketsActions;
Sockets.Dialog = SocketsDialog;
Sockets.DialogStore = SocketsDialogStore;
Sockets.Details = SocketsDetailsView;

export default Sockets;
