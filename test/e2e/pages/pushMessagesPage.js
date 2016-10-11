import instances from '../tempInstances';
import commonElementsPage from './commonElementsPage';

export default {
  elements: {
    sendMessageButton: {
      selector: 'button[data-e2e="push-messages-send-button"]'
    },
    appNameInput: {
      selector: 'input[name="appName"]'
    },
    contentInput: {
      selector: 'input[name="content"]'
    },
    submitButton: {
      selector: 'button[data-e2e="push-message-submit"]'
    },
    submitCancel: {
      selector: 'button[data-e2e="push-message-cancel"]'
    },
    gcmDeviceRow: {
      selector: `[data-e2e="${instances.secondInstance.gcmDevicesNames[0]}-device-row"]`
    },
    apnsDeviceRow: {
      selector: `[data-e2e="${instances.secondInstance.apnsDevicesNames[0]}-device-row"]`
    },
    deviceNumberInput: {
      selector: 'input[name="deviceNumber"]'
    },
    messageListItem: {
      selector: '[data-e2e="push-message-list-item"]'
    },
    ...commonElementsPage
  }
};
