import React from 'react';
import { Dialog } from '../../common';

const ScriptDialogSidebar = () => (
  <Dialog.SidebarBox>
    <Dialog.SidebarSection>
      A Script is an object that contains code that can be run on Syncano&#39;s servers. A Script is a very
       powerful tool. Just like with code, you can do a lot with it. Additionally, Syncano gives you many
       ways to run Scripts.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Runtime environment">
      The runtime environment that the Script will run in (i.e. <strong>Ruby, Python, NodeJS, Golang,
      Swift</strong> and <strong>PHP</strong>). Every runtime environment supports different language and
      several libraries for each language. For example: The Python runtime has a <strong>requests </strong>
      library.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection last={true}>
      <Dialog.SidebarLink to="http://docs.syncano.io/docs/snippets-scripts">
        Learn more
      </Dialog.SidebarLink>
    </Dialog.SidebarSection>
  </Dialog.SidebarBox>
);

export default ScriptDialogSidebar;
