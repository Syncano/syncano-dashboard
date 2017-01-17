import utils from '../utils';

export default {
  elements: {
    channelListItem: {
      selector: '//div[text()="channel_123"]',
      locateStrategy: 'xpath'
    },
    channelDialogConfirmButton: {
      selector: 'button[data-e2e="channel-dialog-confirm-button"]'
    },
    channelSocketsListTitle: {
      selector: '[data-e2e="real-time-channels-list-title"]'
    },
    addChannelButton: {
      selector: '//span[text()="Add"]',
      locateStrategy: 'xpath'
    },
    channelModalTitle: {
      selector: 'div[data-e2e="channel-dialog-title"]'
    },
    confirmButton: {
      selector: 'button[data-e2e="real-time-channel-socket-delete-dialog-confirm"]'
    },
    addChannelModalSummaryTitle: {
      selector: 'div[data-e2e="channel-dialog-summary-title"]'
    },
    editChannelModalTitle: {
      selector: '//h3[text()="Edit a Real-time Channel Socket"]',
      locateStrategy: 'xpath'
    },
    deleteChannelModalTitle: {
      selector: '//h3[text()="Delete a Real-time Channel Socket"]',
      locateStrategy: 'xpath'
    },
    channelTableRow: {
      selector: `//div[text()="${utils.addSuffix('channel')}"]`,
      locateStrategy: 'xpath'
    },
    selectChannelTableRow: {
      selector: `//div[text()="${utils.addSuffix('channel')}"]/../../div[1]/span`,
      locateStrategy: 'xpath'
    },
    channelTableRowDescription: {
      selector: `//div[text()="${utils.addSuffix('channel')}"]/../../../following-sibling::div[1]`,
      locateStrategy: 'xpath'
    },
    channelSocketDropDown: {
      selector: `//div[text()="${utils.addSuffix('channel')}"]/../../../..//button`,
      locateStrategy: 'xpath'
    },
    modalNameInput: {
      selector: '//input[@name="name"]',
      locateStrategy: 'xpath'
    },
    modalDescriptionInput: {
      selector: '//input[@name="description"]',
      locateStrategy: 'xpath'
    },
    channelModalDescriptionInput: {
      selector: '//textarea[@name="description"]',
      locateStrategy: 'xpath'
    },
    channelSummaryDialogCloseButton: {
      selector: 'button[data-e2e="channel-summary-dialog-close-button"]'
    },
    sendChannelMessageModalTitle: {
      selector: '[data-e2e="send-channel-message-dialog-title"]'
    },
    channelModalCustomPublishToggle: {
      selector: '[data-e2e="channel-dialog-custom-publish-toggle"]'
    },
    sendChannelMessageModalContentInput: {
      selector: '[data-e2e="send-channel-message-content-input"]'
    },
    sendChannelMessageButton: {
      selector: '[data-e2e="send-channel-message-dialog-send-message-button"]'
    },
    sendChannelMessageModalFinishButton: {
      selector: '[data-e2e="send-channel-message-dialog-finish-button"]'
    },
    sendChannelMessageSummaryTitle: {
      selector: '[data-e2e="send-channel-message-summary-title"]'
    },
    sendChannelMessageSummaryCloseButton: {
      selector: '[data-e2e="send-channel-message-summary-close-button"]'
    },
    sendChannelMessagePollingToggle: {
      selector: '[data-e2e="send-channel-message-dialog-polling-toggle"]'
    },
    sendChannelMessageMessagesPreview: {
      selector: '[data-e2e="send-channel-message-messages-preview"]'
    }
  }
};
