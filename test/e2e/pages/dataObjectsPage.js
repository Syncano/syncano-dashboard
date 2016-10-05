import accounts from '../tempAccounts';
import utils from '../utils';

export default {
  elements: {
    instancesDropdown: {
      selector: '.instances-dropdown'
    },
    cogIcon: {
      selector: '.synicon-cog'
    },
    dataObjectsTableBody: {
      selector: 'div[data-e2e="data-objects-table"]'
    },
    confirm: {
      selector: '//button[@data-e2e="data-object-submit"]',
      locateStrategy: 'xpath'
    },
    confirmDeleteDialog: {
      selector: 'button[data-e2e="data-object-delete-dialog-confirm"]'
    },
    addDataObjectButton: {
      selector: 'button[data-e2e="data-object-add-button"]'
    },
    deleteDataObjectButton: {
      selector: 'button[data-e2e="data-object-delete-button"]'
    },
    stringField: {
      selector: `input[data-e2e="${accounts.alternativeUser.tempClassNames[0]}-string"]`
    },
    stringFieldTableRow: {
      selector: `td[data-e2e="${accounts.alternativeUser.tempClassNames[0]}-data-object-column"]`
    },
    selectDataObjectTableRow: {
      selector: `//td[text()="${utils.addSuffix('edited')}"]/preceding-sibling::td//input[@type="checkbox"]`,
      locateStrategy: 'xpath'
    }
  }
};
