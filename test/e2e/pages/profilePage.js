export default {
  url: 'https://localhost:8080/#/account',
  elements: {
    updateButton: {
      selector: '//span[text()="Update"]',
      locateStrategy: 'xpath'
    },
    title: {
      selector: '//span[text()="Profile"]',
      locateStrategy: 'xpath'
    },
    firstName: {
      selector: 'input[name=firstName]'
    },
    lastName: {
      selector: 'input[name=lastName]'
    },
    successDialog: {
      selector: '//div[text()="Profile saved successfully."]',
      locateStrategy: 'xpath'
    }
  }
};
