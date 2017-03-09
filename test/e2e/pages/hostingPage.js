import utils from '../utils';

export default {
  elements: {
    addHostingButton: {
      selector: '[data-e2e="add-hosting-button"]'
    },
    nameInput: {
      selector: '[data-e2e="hosting-dialog-name-input"]'
    },
    descriptionInput: {
      selector: '[data-e2e="hosting-dialog-description-input"]'
    },
    cnameInput: {
      selector: '[data-e2e="hosting-dialog-cname-input"]'
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
    hostingListItemDescription: {
      selector: `[data-e2e="${utils.addSuffix('edited')}-hosting-list-item-description"]`
    },
    deleteHostingConfirmButton: {
      selector: '[data-e2e="hosting-delete-dialog-confirm"]'
    },
    hostingDropdownIcon: {
      selector: `[data-e2e="${utils.getHostingName()}-hosting-dropdown-icon"]`
    },
    editedHostingDropdownIcon: {
      selector: `[data-e2e="${utils.addSuffix('edited')}-hosting-dropdown-icon"]`
    },
    hostingListItemDropdownEditOption: {
      selector: '[data-e2e="dropdown-hosting-item-edit"]'
    },
    hostingListItemDropdownDeleteOption: {
      selector: '[data-e2e="dropdown-hosting-item-delete"]'
    },
    hostingListItemFilesLink: {
      selector: `[data-e2e="${utils.getHostingName()}-hosting-list-item-files"]`
    },
    hostingUploadFilesInput: {
      selector: '[data-e2e="hosting-upload-files"]'
    },
    hostingSendFilesButton: {
      selector: '[data-e2e="hosting-send-files"]'
    },
    hostingFilesListItem: {
      selector: '[data-e2e="simplefilename.testfile-list-item-name"]'
    },
    hostingFilesListItemDescription: {
      selector: '[data-e2e="simplefilename.testfile-list-item-description"]'
    },
    innerToolbarBackButton: {
      selector: '[data-e2e="innertoolbar-back-button"]'
    },
    hostingFilesAlertIcon: {
      selector: '[data-e2e="hosting-files-alert-icon"]'
    }
  }
};
