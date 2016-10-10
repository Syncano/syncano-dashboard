import React from 'react';
import { Dialog } from '../../common/';

const TriggerDialogSidebar = () => (
  <Dialog.SidebarBox>
    <Dialog.SidebarSection>
      {`Trigger Sockets execute a Script when a Data Object inside selected Data Class is created,
       updated or deleted (depends on "signal" field value).`}
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Signal">
      Signal indicates which operation performed on Data Object should execute the Trigger.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Data Class">
      Operations on Data Objects in selected Data Class will execute the Trigger.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Script">
      {"Snippet Script name that'll be executed by this Trigger."}
    </Dialog.SidebarSection>
    <Dialog.SidebarSection last={true}>
      <Dialog.SidebarLink to="http://docs.syncano.io/docs/triggers">
        Learn more
      </Dialog.SidebarLink>
    </Dialog.SidebarSection>
  </Dialog.SidebarBox>
);

export default TriggerDialogSidebar;
