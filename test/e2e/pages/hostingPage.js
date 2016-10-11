import utils from '../utils';

export default {
  elements: {
    addHostingButton: {
      selector: '[data-e2e="add-hosting-button"]'
    },
    labelInput: {
      selector: '[data-e2e="hosting-dialog-label-input"]'
    },
    descriptionInput: {
      selector: '[data-e2e="hosting-dialog-description-input"]'
    },
    newDomainInput: {
      selector: '[data-e2e="hosting-dialog-new-domain-input"]'
    },
    addNewDomainButton: {
      selector: '[data-e2e="domain-add-button"]'
    },
    addHostingConfirmButton: {
      selector: '[data-e2e="hosting-dialog-submit-button"]'
    },
    hostingList: {
      selector: '[data-e2e="hosting-list-container"]'
    },
    hostingListItemLabel: {
      selector: `[data-e2e="${utils.addSuffix('edited')}-list-item-name"]`
    },
    hostingListItemDescription: {
      selector: `[data-e2e="${utils.addSuffix('edited')}-hosting-list-item-description"]`
    },
    deleteHostingConfirmButton: {
      selector: '[data-e2e="hosting-delete-dialog-confirm"]'
    },
    hostingDropdownIcon: {
      selector: `[data-e2e="${utils.addSuffix('hosting')}-hosting-dropdown-icon"]`
    },
    editedHostingDropdownIcon: {
      selector: `[data-e2e="${utils.addSuffix('edited')}-hosting-dropdown-icon"]`
    },
    hostingListItemDropdownEditOption: {
      selector: '[data-e2e="dropdown-hosting-item-edit"]'
    },
    hostingListItemDropdownDeleteOption: {
      selector: '[data-e2e="dropdown-hosting-item-delete"]'
    }
  }
};
