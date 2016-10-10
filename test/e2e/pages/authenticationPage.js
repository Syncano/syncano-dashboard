import commonElementsPage from './commonElementsPage';
import utils from '../utils';

export default {
  url: `${utils.testBaseUrl()}/#/account/authentication/`,
  elements: {
    updateButton: {
      selector: '[data-e2e="authentication-update-button"]'
    },
    accountKey: {
      selector: '[data-e2e="authentication-account-key"]'
    },
    copyButton: {
      selector: '[data-e2e="authentication-reset-button"]'
    },
    resetButton: {
      selector: '[data-e2e="authentication-reset-button"]'
    },
    currentPassword: {
      selector: 'input[name="currentPassword"]'
    },
    newPassword: {
      selector: 'input[name="newPassword"]'
    },
    confirmNewPassword: {
      selector: 'input[name="confirmNewPassword"]'
    },
    ...commonElementsPage
  }
};
