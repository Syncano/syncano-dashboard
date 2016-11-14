import utils from '../utils';

export default {
  elements: {
    addUserButton: {
      selector: '[data-e2e="add-user-button"]'
    },
    username: {
      selector: 'input[name="username"]'
    },
    password: {
      selector: 'input[name="password"]'
    },
    userDialogConfirmButton: {
      selector: '[data-e2e="user-dialog-confirm-button"]'
    },
    userDialogDeleteButton: {
      selector: '[data-e2e="user-delete-dialog-confirm"]'
    },
    groupDialogConfirmButton: {
      selector: '[data-e2e="group-dialog-confirm-button"]'
    },
    groupDialogDeleteButton: {
      selector: '[data-e2e="group-delete-dialog-confirm"]'
    },
    userTableRow: {
      selector: `[data-e2e="${utils.addSuffix('user')}-list-item-name"`
    },
    selectUserTableRow: {
      selector: `//div[text()="${utils.addSuffix('user')}"]/../../../following-sibling::div//button`,
      locateStrategy: 'xpath'
    },
    deleteUserModalTitle: {
      selector: '//h3[text()="Delete a User"]',
      locateStrategy: 'xpath'
    },
    addGroupButton: {
      selector: '[data-e2e="add-group-button"]'
    },
    addGroupModalTitle: {
      selector: '[data-e2e="group-dialog-title"]'
    },
    addGroupModalSummaryTitle: {
      selector: '[data-e2e="group-dialog-summary-title"]'
    },
    groupName: {
      selector: '[data-e2e="group-dialog-input-group-name"]'
    },
    groupTableRow: {
      selector: `[data-e2e="${utils.addSuffix('group')}-list-item-name"`
    },
    groupTableRowDropdown: {
      selector: `//div[text()="${utils.addSuffix('group')}"]/../../../following-sibling::div//button`,
      locateStrategy: 'xpath'
    },
    deleteGroupModalTitle: {
      selector: '//h3[text()="Delete a Group"]',
      locateStrategy: 'xpath'
    },
    userList: {
      selector: 'div[class="users-list"]'
    },
    groupList: {
      selector: 'div[class="groups-list"]'
    },
    groupSummaryDialogCloseButton: {
      selector: '[data-e2e="group-summary-dialog-close-button"]'
    }
  }
};
