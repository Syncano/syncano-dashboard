import Dialog from './Dialog';
import DeleteDialog from './DeleteDialog';
import DialogTitleWithIcon from './DialogTitleWithIcon';
import FullPageDialog from './FullPageDialog';
import BlurPageDialog from './BlurPageDialog';
import DialogSidebar from './DialogSidebar';
import DialogSidebarBox from './DialogSidebarBox';
import DialogSidebarSection from './DialogSidebarSection';
import DialogSidebarLink from './DialogSidebarLink';
import DialogContent from './DialogContent';
import DialogContentSection from './DialogContentSection';
import DialogStandardButtons from './DialogStandardButtons';
import DialogSummaryRedirect from './DialogSummaryRedirect';

import DialogBindShortcutsHOC from './DialogBindShortcutsHOC';

Dialog.Delete = DeleteDialog;
Dialog.FullPage = FullPageDialog;
Dialog.BlurPage = BlurPageDialog;
Dialog.TitleWithIcon = DialogTitleWithIcon;
Dialog.Sidebar = DialogSidebar;
Dialog.SidebarBox = DialogSidebarBox;
Dialog.SidebarSection = DialogSidebarSection;
Dialog.SidebarLink = DialogSidebarLink;
Dialog.Content = DialogContent;
Dialog.ContentSection = DialogContentSection;
Dialog.StandardButtons = DialogStandardButtons;
Dialog.SummaryRedirect = DialogSummaryRedirect;

export { DialogBindShortcutsHOC };

export default Dialog;
