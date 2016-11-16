import utils from '../utils';

export default {
  elements: {
    classesListMenu: {
      selector: '//div[@class="classes-list"]/div[1]/div[@class="col-menu"]//button',
      locateStrategy: 'xpath'
    },
    createModalNameInput: {
      selector: 'input[name=class]'
    },
    createModalFieldNameInput: {
      selector: 'input[name=fieldName]'
    },
    createModalDropdownType: {
      selector: '//div[@class="fieldType-dropdown"]/div/div',
      locateStrategy: 'xpath'
    },
    createModalDescriptionInput: {
      selector: 'input[name="description"]'
    },
    classTableRows: {
      selector: '//div[@class="classes-list"]/div[2]/div',
      locateStrategy: 'xpath'
    },
    classTableRow: {
      selector: `//div[text()="${utils.addSuffix('class')}"]`,
      locateStrategy: 'xpath'
    },
    userProfileClassName: {
      selector: '[data-e2e="user_profile-list-item-name"]'
    },
    userClassListItem: {
      selector: '[data-e2e="user_profile-check-icon"]'
    },
    classTableRowDescription: {
      selector: `div[data-e2e="${utils.addSuffix('class')}-list-item-description"]`
    },
    classTableName: {
      selector: `div[data-e2e="${utils.addSuffix('class')}-list-item-name"]`
    },

    checkboxSelected: {
      selector: '//span[@class="synicon-checkbox-marked-outline"]',
      locateStrategy: 'xpath'
    },
    classesListItemDropDown: {
      selector: `//div[text()="${utils.addSuffix('class')}"]/../../../
        following-sibling::div//span[@class="synicon-dots-vertical"]`,
      locateStrategy: 'xpath'
    }
  }
};
