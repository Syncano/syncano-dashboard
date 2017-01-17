const signupCommands = {
  clickTermsOfUseLink() {
    return this.waitForElementVisible('@termsOfUseLink')
      .click('@termsOfUseLink');
  }
};

export default {
  url: 'https://localhost:8080/#/signup',
  commands: [signupCommands],
  elements: {
    emailInput: {
      selector: 'input[type=text]'
    },
    passInput: {
      selector: 'input[name=password]'
    },
    submitButton: {
      selector: 'button[type=submit]'
    },
    setupScreen: {
      selector: '//div[@class="col-flex-1"]/div[@class="vm-3-b"]',
      locateStrategy: 'xpath'
    },
    socketsList: {
      selector: '[data-e2e="sockets-list"]'
    },
    termsOfUseLink: {
      selector: 'p.vm-0-b.text--center a'
    }
  }
};
