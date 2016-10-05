import React from 'react';
import { Dialog } from '../../common/';

const SchriptEndpointDialogSidebar = () => (
  <Dialog.SidebarBox>
    <Dialog.SidebarSection>
      Script Endpoints are URLs that run your custom code in the cloud.
      This code can be created with Scripts.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Script">
      A Script is an object that contains a piece of code that can be run on Syncano servers.
      If you haven&#39;t created one you can do so&nbsp;
      <Dialog.SidebarLink to="scripts">
        here.
      </Dialog.SidebarLink>
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Public">
      Determines whether the Script Endpoint public link is active. They are accessible to anyone who knows the
       Script Endpoint URL.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection last={true}>
      <Dialog.SidebarLink to="http://docs.syncano.io/docs/endpoints-scripts">
        Learn more
      </Dialog.SidebarLink>
    </Dialog.SidebarSection>
  </Dialog.SidebarBox>
);

export default SchriptEndpointDialogSidebar;
