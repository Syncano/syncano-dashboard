import accounts from '../tempAccounts';

export default {
  elements: {
    leftMenu: {
      selector: '.left-nav'
    },
    instancesDropdown: {
      selector: '[data-e2e="instances-dropdown"]'
    },
    userInstanceName: {
      selector: `span[data-e2e="${accounts.instanceUser.tempInstanceNames[0]}"]`
    },
    instancesDropdownName: {
      selector: '//span[@class="synicon-menu-down"]/preceding-sibling::div',
      locateStrategy: 'xpath'
    },
    currentIinstanceName: {
      selector: `div[data-e2e="current-instanceName-${accounts.instanceUser.tempInstanceNames[0]}"]`
    },
    instancesListSecondItem: {
      selector: '//div[@class="my-instances-list"]/div[2]',
      locateStrategy: 'xpath'
    },
    users: {
      selector: 'a[data-e2e="left-sidebar-users"]'
    },
    classes: {
      selector: 'a[data-e2e="left-sidebar-classes"]'
    },
    snippets: {
      selector: 'a[data-e2e="left-sidebar-snippets"]'
    },
    general: {
      selector: 'span[data-e2e="left-sidebar-synicon-settings"]'
    },
    administrators: {
      selector: 'a[data-e2e="left-sidebar-admins"]'
    },
    apiKeys: {
      selector: 'a[data-e2e="left-sidebar-api-keys"]'
    },
    globalConfig: {
      selector: 'span[data-e2e="left-sidebar-global-config"]'
    },
    authentication: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Authentication"]',
      locateStrategy: 'xpath'
    },
    invitations: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Invitations"]',
      locateStrategy: 'xpath'
    },
    billingPlan: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Plans & Pricing"]',
      locateStrategy: 'xpath'
    },
    paymentMethods: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Payment Methods"]',
      locateStrategy: 'xpath'
    },
    invoices: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Invoices"]',
      locateStrategy: 'xpath'
    },
    billingAddress: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Billing Address"]',
      locateStrategy: 'xpath'
    }
  }
};
