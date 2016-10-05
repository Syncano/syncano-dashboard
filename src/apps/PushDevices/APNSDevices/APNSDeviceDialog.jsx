import Actions from './APNSDevicesActions';
import Store from './APNSDeviceDialogStore';
import React from 'react';

import DeviceDialog from '../DeviceDialog';
import { Dialog } from '../../../common/';

const sidebar = (
  <Dialog.SidebarBox>
    <Dialog.SidebarSection>
      Apple Devices allows you to send Push Notifications to your iOS devices.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection>
      <i>NOTE: At least one production or development certificate must be uploaded.</i>
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Registration ID">
      Your application must register in APNS service to receive Push Notifications. Registration ID is the key that
       authenticates your app with an APNS server.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="User ID">
      Assigns a device to the Syncano user with this ID.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection title="Device ID">
      It&#39;s a unique identificator of your device.
    </Dialog.SidebarSection>
    <Dialog.SidebarSection last={true}>
      <Dialog.SidebarLink to="http://docs.syncano.io/docs/sending-push-notifications">
        Learn more
      </Dialog.SidebarLink>
    </Dialog.SidebarSection>
  </Dialog.SidebarBox>
);

export default DeviceDialog('APNS', Store, Actions, sidebar);
