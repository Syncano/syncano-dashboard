import React from 'react';

import Actions from './GCMDevicesActions';
import Store from './GCMDeviceDialogStore';

import DeviceDialog from '../DeviceDialog';
import { Dialog } from '../../../common/';

const sidebar = (
  <Dialog.SidebarBox>
    <Dialog.SidebarSection>
      GCM allows you to send Push Notifications to your Android devices.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection>
      <i>NOTE: At least one production or development API key must be added.</i>
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Registration ID">
      To send and receive Push Notifications your app must register with GCM. In this process, the client gets a
       unique registration ID. Read more at&nbsp;
      <Dialog.SidebarLink to="https://console.developers.google.com">
        Google Developer Console.
      </Dialog.SidebarLink>
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="User ID">
      Connects the device with Syncano user. The device will be assigned to the user with this ID.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Device ID">
      It&#39;s a unique ID assigned to your device.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection last={true}>
      <Dialog.SidebarLink to="http://docs.syncano.io/docs/sending-push-notifications">
        Learn more
      </Dialog.SidebarLink>
    </Dialog.SidebarSection>
  </Dialog.SidebarBox>
);

export default DeviceDialog('GCM', Store, Actions, sidebar);
