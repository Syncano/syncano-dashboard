import React from 'react';
import { Dialog } from '../../common/';

const SocketsRegistryDialogSidebar = () => (
  <Dialog.SidebarBox>
    <Dialog.SidebarSection title="Instance name">
      An Instance where your  Socket will be installed.
      You can choose New Instance option to create a new one during installation.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Socket name">
      Tou can change the default name of the socket
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Twitter API Key">
      Your application consumer key. Can be found at&nbsp;
      <Dialog.SidebarLink to="https://apps.twitter.com/">
        https://apps.twitter.com/
      </Dialog.SidebarLink>
    </Dialog.SidebarSection>
  </Dialog.SidebarBox>
);

export default SocketsRegistryDialogSidebar;
