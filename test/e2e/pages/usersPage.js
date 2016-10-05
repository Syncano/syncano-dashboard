import utils from '../utils';

export default {
  elements: {
    addUserButton: {
      selector: 'button[data-e2e="add-user-button"]'
    },
    username: {
      selector: 'input[name="username"]'
    },
    password: {
      selector: 'input[name="password"]'
    },
    userDialogConfirmButton: {
      selector: 'button[data-e2e="user-dialog-confirm-button"]'
    },
    userDialogDeleteButton: {
      selector: 'button[data-e2e="user-delete-dialog-confirm"]'
    },
    groupDialogConfirmButton: {
      selector: 'button[data-e2e="group-dialog-confirm-button"]'
    },
    groupDialogDeleteButton: {
      selector: 'button[data-e2e="group-delete-dialog-confirm"]'
    },
    userTableRow: {
      selector: `div[data-e2e="${utils.addSuffix('user')}-list-item-name"`
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
      selector: 'button[data-e2e="add-group-button"]'
    },
    addGroupModalTitle: {
      selector: 'div[data-e2e="group-dialog-title"]'
    },
    addGroupModalSummaryTitle: {
      selector: 'div[data-e2e="group-dialog-summary-title"]'
    },
    groupName: {
      selector: 'input[data-e2e="group-dialog-input-group-name"]'
    },
    groupTableRow: {
      selector: `div[data-e2e="${utils.addSuffix('group')}-list-item-name"`
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
      selector: 'button[data-e2e="group-summary-dialog-close-button"]'
    }
  }
};
