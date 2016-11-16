import CustomSocketsRegistry from './CustomSocketsRegistry';
import CustomSocketsRegistryStore from './CustomSocketsRegistryStore';
import CustomSocketsRegistryList from './CustomSocketsRegistryList';
import CustomSocketsRegistryListItem from './CustomSocketsRegistryListItem';
import CustomSocketsRegistryActions from './CustomSocketsRegistryActions';
import CustomSocketsRegistryDialog from './CustomSocketsRegistryDialog';
import CustomSocketsRegistryDialogStore from './CustomSocketsRegistryDialogStore';
import CustomSocketsRegistryDetailsView from './DetailsView/CustomSocketDetailsView';

CustomSocketsRegistry.Store = CustomSocketsRegistryStore;
CustomSocketsRegistry.List = CustomSocketsRegistryList;
CustomSocketsRegistry.ListItem = CustomSocketsRegistryListItem;
CustomSocketsRegistry.Actions = CustomSocketsRegistryActions;
CustomSocketsRegistry.Dialog = CustomSocketsRegistryDialog;
CustomSocketsRegistry.DialogStore = CustomSocketsRegistryDialogStore;
CustomSocketsRegistry.Details = CustomSocketsRegistryDetailsView;

export default CustomSocketsRegistry;
