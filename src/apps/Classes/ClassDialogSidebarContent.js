import React from 'react';
import { Dialog } from '../../common';

export default () => (
  <Dialog.SidebarBox>
    <Dialog.SidebarSection>
      Data Classes are templates for Data Objects which will be stored in Syncano. In order to be able to add
      Data Objects, you have to define a Data Class.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Permissions">
      This is place where you can manage who will have access to your Data Objects.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Schema">
      Data Class schema determines what type of data your Data Objects can store.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection>
      <i>Note: Schema field name has to start with a letter!</i>
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Filtering & Ordering">
      {`To be able to filter and order the Data Objects you'll need to add proper indexes to your
      Data Class Schema fields by selecting the corresponding checkboxes.`}
    </Dialog.SidebarSection>
    <Dialog.SidebarSection>
      <i>Note: Not all the Data Class Schema Field types allow for adding filter/order indexes.</i>
    </Dialog.SidebarSection>
    <Dialog.SidebarSection last={true}>
      <Dialog.SidebarLink to="http://docs.syncano.io/docs/classes">
        Learn more about Data Classes
      </Dialog.SidebarLink>
    </Dialog.SidebarSection>
  </Dialog.SidebarBox>
);
