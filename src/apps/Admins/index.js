import Admins from './Admins';
import AdminsStore from './AdminsStore';
import AdminDialog from './AdminDialog';
import AdminDialogStore from './AdminDialogStore';
import AdminsActions from './AdminsActions';
import AdminsList from './AdminsList';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import AdminsInvitationsStore from './AdminsInvitationsStore';

Admins.Dialog = AdminDialog;
Admins.DialogStore = AdminDialogStore;
Admins.List = AdminsList;
Admins.Actions = AdminsActions;
Admins.Store = AdminsStore;
Admins.InvitationsActions = AdminsInvitationsActions;
Admins.InvitationsStore = AdminsInvitationsStore;

export default Admins;
