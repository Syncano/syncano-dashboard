import utils from '../utils';
import accounts from '../tempAccounts';

export default {
  elements: {
    addSocketButton: {
      selector: '[data-e2e="sockets-toolbar-add-button"]'
    },
    modalDescriptionInput: {
      selector: 'input[name="description"]'
    },
    modalDescriptionTextarea: {
      selector: 'textarea[name="description"]'
    },
    endpointNameInput: {
      selector: 'input[data-e2e="script-endpoint-name"]'
    },
    scriptName: {
      selector: 'input[data-e2e="script-name"]'
    },
    scriptSampleOption: {
      selector: `[data-e2e="${utils.getRandomSampleScriptName()}-sample-option"]`
    },
    scriptUserOption: {
      selector: `[data-e2e=${accounts.alternativeUser.tempScriptNames[0]}-user-option]`
    },
    emptySocketsHeading: {
      selector: '[data-e2e="empty-sockets-heading"]'
    },
    addApnsSocket: {
      selector: '[data-e2e="apns-socket-popover"]'
    },
    uploadApnsDevCert: {
      selector: '[data-e2e="development-upload-cert-button"]'
    },
    addGcmSocket: {
      selector: '[data-e2e="gcm-socket-popover"]'
    },
    inputGcmDevKey: {
      selector: 'input[name="development_api_key"]'
    },
    inputGcmProdKey: {
      selector: 'input[name="production_api_key"]'
    },
    apnsDevCertInput: {
      selector: '[data-e2e="development-certificate-name-input"]'
    },
    removeApnsCertificate: {
      selector: '[data-e2e="apns-notification-remove-certificate"]'
    },
    developmentDropZoneDescription: {
      selector: '[data-e2e="development-dropzone-description"]'
    },
    configPushItem: {
      selector: '[data-e2e="push-notification-config"]'
    },
    devicesPushItem: {
      selector: '[data-e2e="push-notification-device-list"]'
    },
    gcmPushSocketDevicesLinkIcon: {
      selector: '[data-e2e="push-notification-devices-link-icon-GCM"]'
    },
    apnsPushSocketDevicesLinkIcon: {
      selector: '[data-e2e="push-notification-devices-link-icon-APNS"]'
    },
    pushSocketsZeroState: {
      selector: '[data-e2e="push-notifications-empty-view"]'
    },
    addPushNotificationButton: {
      selector: '[data-e2e="push-notification-toolbar-add-button"]'
    },
    pushNotificationsCancel: {
      selector: '[data-e2e="push-notification-cancel-button"]'
    },
    pushNotificationsSubmit: {
      selector: '[data-e2e="push-notification-submit-button"]'
    },
    gcmPushNotifciationsCloseDialog: {
      selector: '[data-e2e="gcm-push-nofitication-dialog-close-button"]'
    },
    addScriptSocketButton: {
      selector: '[data-e2e="script-socket-toolbar-add-button"]'
    },
    scriptSocketSubmitButton: {
      selector: 'button[data-e2e="script-dialog-confirm-button"]'
    },
    scriptSocketCloseDialog: {
      selector: 'span[class="synicon-close"]'
    },
    scriptSocketCloseDialogButton: {
      selector: '[data-e2e="script-endpoint-summary-dialog-close-button"]'
    },
    scriptSocketRow: {
      selector: `[data-e2e="${utils.addSuffix('script')}-script-socket-row"]`
    },
    scriptSocketRowDescription: {
      selector: `[data-e2e="${utils.addSuffix('script')}-script-socket-description"]`
    },
    scriptSocketRelatedScript: {
      selector: `a[data-e2e="${utils.addSuffix('sample_script')}-script-socket-related-script"]`
    },
    scriptSocketDeleteDialogButton: {
      selector: '[data-e2e="script-endpoint-delete-dialog-confirm"]'
    },
    codeEditorContent: {
      selector: 'div[id="editorSource"]'
    }
  }
};
