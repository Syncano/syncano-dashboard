import AllDevicesLists from './AllDevicesLists';
import APNSDevices from './APNSDevices/APNSDevices';
import GCMDevices from './GCMDevices/GCMDevices';
import DevicesList from './DevicesList';
import DevicesListItem from './DevicesListItem';
import DeviceDialog from './DeviceDialog';
import APNSDeviceDialog from './APNSDevices/APNSDeviceDialog';
import GCMDeviceDialog from './GCMDevices/GCMDeviceDialog';
import APNSDevicesActions from './APNSDevices/APNSDevicesActions';
import GCMDevicesActions from './GCMDevices/GCMDevicesActions';
import GCMDevicesStore from './GCMDevices/GCMDevicesStore';
import APNSDevicesStore from './APNSDevices/APNSDevicesStore';
import GCMDeviceDialogStore from './GCMDevices/GCMDeviceDialogStore';
import APNSDeviceDialogStore from './APNSDevices/APNSDeviceDialogStore';

const Devices = {};

Devices.APNS = APNSDevices;
Devices.GCM = GCMDevices;
Devices.AllDevices = AllDevicesLists;
Devices.List = DevicesList;
Devices.ListItem = DevicesListItem;
Devices.APNSActions = APNSDevicesActions;
Devices.GCMActions = GCMDevicesActions;
Devices.GCMStore = GCMDevicesStore;
Devices.APNSStore = APNSDevicesStore;
Devices.Dialog = DeviceDialog;
Devices.GCMDialog = GCMDeviceDialog;
Devices.APNSDialog = APNSDeviceDialog;
Devices.GCMDialogStore = GCMDeviceDialogStore;
Devices.GCMDialogStore = APNSDeviceDialogStore;

export default Devices;
