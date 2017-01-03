import SocketsRegistry from './SocketsRegistry';
import SocketsRegistryStore from './SocketsRegistryStore';
import SocketsRegistryList from './SocketsRegistryList';
import SocketsRegistryListItem from './SocketsRegistryListItem';
import SocketsRegistryActions from './SocketsRegistryActions';
import SocketsRegistryDialogStore from './SocketsRegistryDialogStore';
import SocketsRegistryDetailsView from './DetailsView/SocketDetailsView';

SocketsRegistry.Store = SocketsRegistryStore;
SocketsRegistry.List = SocketsRegistryList;
SocketsRegistry.ListItem = SocketsRegistryListItem;
SocketsRegistry.Actions = SocketsRegistryActions;
SocketsRegistry.DialogStore = SocketsRegistryDialogStore;
SocketsRegistry.Details = SocketsRegistryDetailsView;

export default SocketsRegistry;
