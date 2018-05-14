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
    messageListItem: {
      selector: '[data-e2e="push-message-list-item"]'
    },
    ...commonElementsPage
  }
};
