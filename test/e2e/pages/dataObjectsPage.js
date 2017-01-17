import instances from '../tempInstances';
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
      selector: '[data-e2e="data-objects-table"]'
    },
    confirm: {
      selector: '[data-e2e="data-object-submit"]'
    },
    confirmDeleteDialog: {
      selector: '[data-e2e="data-object-delete-dialog-confirm"]'
    },
    addDataObjectButton: {
      selector: '[data-e2e="data-object-add-button"]'
    },
    deleteDataObjectButton: {
      selector: '[data-e2e="data-object-delete-button"]'
    },
    stringField: {
      selector: `[data-e2e="${instances.secondInstance.classNames[0]}-string"]`
    },
    stringFieldTableRow: {
      selector: `[data-e2e="${instances.secondInstance.classNames[0]}-data-object-column"]`
    },
    selectDataObjectTableRow: {
      selector: `//td[text()="${utils.addSuffix('edited')}"]/preceding-sibling::td//input[@type="checkbox"]`,
      locateStrategy: 'xpath'
    },
    searchDataObjectInput: {
      selector: '[data-e2e="search-data-object-input"]'
    },
    searchDataObjectButton: {
      selector: '[data-e2e="search-data-object-button"]'
    },
    deleteDataObjectDialogButton: {
      selector: '[data-e2e="delete-data-object-dialog-button"]'
    }
  }
};
