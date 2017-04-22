import instances from '../tempInstances';

const instancesCommands = {
  clickFAB() {
    return this.waitForElementVisible('@fab')
      .click('@fab')
      .waitForElementVisible('@confirmButton');
  },
  fillInstanceDescription(field, description) {
    return this.waitForElementVisible(field)
      .clearValue(field)
      .setValue(field, '')
      .clearValue(field)
      .setValue(field, description);
  },
  isModalClosed(element) {
    return this.waitForElementNotVisible(element, 25000);
  }
};

export default {
  url: 'https://localhost:8080/#/instances',
  commands: [instancesCommands],
  elements: {
    instanceDropdown: {
      selector: '(//span[@class="synicon-dots-vertical"])[1]',
      locateStrategy: 'xpath'
    },
    instancesDropdown: {
      selector: '(//span[@class="synicon-dots-vertical"])[1]',
      locateStrategy: 'xpath'
    },
    instancesTable: {
      selector: 'div[id=instances]'
    },
    fab: {
      selector: '.synicon-plus'
    },
    createModalNameInput: {
      selector: 'input[name=name]'
    },
    createModalDescriptionInput: {
      selector: 'textarea[name=description]'
    },
    confirmButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    confirmDeleteButton: {
      selector: '//button//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    instancesTableRow: {
      selector: '//div[@class="description-field col-flex-1"]',
      locateStrategy: 'xpath'
    },
    instancesTableName: {
      selector: '(//div[@class="instances-list"]//button/following-sibling::div/div/div)[1]',
      locateStrategy: 'xpath'
    },
    selectInstance: {
      selector: '//div[@class="instances-list"]/div[2]/div[1]/div[1]//button',
      locateStrategy: 'xpath'
    },
    editDropdownItem: {
      selector: '//span[@class="dropdown-item-instance-edit"]',
      locateStrategy: 'xpath'
    },
    deleteDropdownItem: {
      selector: '//span[@class="dropdown-item-instance-delete"]',
      locateStrategy: 'xpath'
    },
    editButton: {
      selector: '.synicon-pencil'
    },
    deleteButton: {
      selector: '.synicon-delete'
    },
    selectButton: {
      selector: '.synicon-checkbox-multiple-marked-outline'
    },
    instanceSelected: {
      selector: '.synicon-checkbox-marked-outline'
    },
    instanceToSelect: {
      selector: '.synicon-checkbox-blank-outline'
    },
    instancesTableRowDescription: {
      selector: '//div[@class="instances-list-container"]/div[2]//div[@class="col-flex-1"]',
      locateStrategy: 'xpath'
    },
    emptyListItem: {
      selector: '.empty-list-item'
    },
    editInstanceModalTitle: {
      selector: '//h3[text()="Update an Instance"]',
      locateStrategy: 'xpath'
    },
    deleteInstanceModalTitle: {
      selector: '//h3[text()="Delete an Instance"]',
      locateStrategy: 'xpath'
    },
    instanceDescription: {
      selector: '//div[@class="description-field col-flex-1" and text()="nightwatch_test_instance"]',
      locateStrategy: 'xpath'
    },
    instancesHeaderTitle: {
      selector: '[data-e2e="instances-page-title"]'
    },
    setupPageContent: {
      selector: '[data-e2e="setup-page-content"]'
    },
    confirmTextField: {
      selector: '//div[@class="confirmation-text-field"]/input',
      locateStrategy: 'xpath'
    },
    instancesListRowName: {
      selector: `[data-e2e="${instances.thirdInstance.instanceName}-list-row-name"]`
    },
    instancesListRowButton: {
      selector: `//*[@data-e2e="${instances.thirdInstance.instanceName}-list-row-name"]/div/div`,
      locateStrategy: 'xpath'
    }
  }
};
