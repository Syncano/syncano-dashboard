import Utils from '../utils';

export default {
  url: `${Utils.testBaseUrl()}/#/account/authentication/`,
  elements: {
    updateButton: {
      selector: '//div[@class="raised-button"]',
      locateStrategy: 'xpath'
    },
    accountKey: {
      selector: '//div[text()="Account key"]/../div[@class="row"]/div[1]',
      locateStrategy: 'xpath'
    },
    copyButton: {
      selector: '//span[text()="COPY"]',
      locateStrategy: 'xpath'
    },
    resetButton: {
      selector: '//span[text()="RESET"]',
      locateStrategy: 'xpath'
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
    notificationMessage: {
      selector: '//span[text()="Password changed successfully"]',
      locateStrategy: 'xpath'
    }
  }
};
