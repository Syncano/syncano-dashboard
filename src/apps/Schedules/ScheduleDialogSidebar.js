import React from 'react';
import { Dialog } from '../../common/';

const ScheduleDialogSidebar = () => (
  <Dialog.SidebarBox>
    <Dialog.SidebarSection>
      Schedule Sockets are one of the available ways of running your Snippet Scripts. Thanks to Schedules
      you can execute Scripts at some time interval.
      (e.g. every 5 minutes).
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Script">
      Chosen Script will be executed at selected time interval writen as crontab.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Crontab">
      We prepared some crontabs to choose from. You can also write your own.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection last={true}>
      <Dialog.SidebarLink to="http://docs.syncano.io/docs/schedules">
        Learn more
      </Dialog.SidebarLink>
    </Dialog.SidebarSection>
  </Dialog.SidebarBox>
);

export default ScheduleDialogSidebar;
