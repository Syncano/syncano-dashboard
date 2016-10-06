import accounts from '../tempAccounts';

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
      selector: `tr[data-e2e="${accounts.alternativeUser.tempGCMDevicesNames[0]}-device-row"]`
    },
    apnsDeviceRow: {
      selector: `tr[data-e2e="${accounts.alternativeUser.tempAPNSDevicesNames[0]}-device-row"]`
    },
    deviceNumberInput: {
      selector: 'input[name="deviceNumber"]'
    },
    snackBarNotification: {
      selector: 'div[data-e2e="snackbar-notifcation"]'
    }
  }
};
