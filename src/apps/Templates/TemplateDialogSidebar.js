import React from 'react';
import { Dialog } from '../../common';

const TemplateDialogSidebar = () => (
  <Dialog.SidebarBox>
    <Dialog.SidebarSection>
      Templates let you wrap your data returned from any endpoint and convert it into a desired document
      structure. It can be html, xml, csv or any other format.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Content type">
      Content-Type field is to describe the data contained in the body fully enough so that the receiving
      user agent can pick an appropriate method to process the data.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection last={true}>
      <Dialog.SidebarLink to="http://docs.syncano.io/docs/snippets-templates">
        Learn more
      </Dialog.SidebarLink>
    </Dialog.SidebarSection>
  </Dialog.SidebarBox>
);

export default TemplateDialogSidebar;
