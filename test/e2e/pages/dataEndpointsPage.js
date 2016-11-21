import utils from '../utils';

export default {
  elements: {
    addSocketButton: {
      selector: '[data-e2e="data-endpoint-sockets-toolbar-add-button"]'
    },
    endpointFirstItemOptionsMenu: {
      selector: `//div[@data-e2e="${utils.addSuffix('data-endpoint')}-data-endpoint-options-menu"]`,
      locateStrategy: 'xpath'
    },
    confirmButton: {
      selector: 'button[data-e2e="data-endpoint-delete-dialog-confirm"]'
    },
    addButtonZeroState: {
      selector: 'button[data-e2e="zero-state-add-button"]'
    },
    endpointName: {
      selector: 'input[name="name"]'
    },
    endpointDescription: {
      selector: 'input[name="description"]'
    },
    endpointClassName: {
      selector: 'input[name="class"]'
    },
    endpointSampleClass: {
      selector: `[data-e2e="${utils.getRandomSampleClassName()}-sample-option"]`
    },
    endpointConfirm: {
      selector: 'button[data-e2e="data-endpoint-submit"]'
    },
    endpointCancel: {
      selector: 'button[data-e2e="data-endpoint-cancel"]'
    },
    classFieldName: {
      selector: 'input[name="fieldName"]'
    },
    classLastFieldName: {
      selector: 'input[data-e2e="new-class-field-name"]'
    },
    classFieldType: {
      selector: 'div[name="fieldType"]'
    },
    classDropdownSelection: {
      selector: 'span[data-e2e="dropdown-choice-string"]'
    },
    classCheckBoxFilter: {
      selector: '[data-e2e="filter-string-checkbox-name"]'
    },
    classCheckBoxOrder: {
      selector: 'input[data-e2e="order-string-checkbox-name"]'
    },
    addClassFieldButton: {
      selector: 'button[data-e2e="class-add-field-button"]'
    },
    endpointPageSize: {
      selector: 'input[name="page_size"]'
    },
    endpointOrderBy: {
      selector: '[data-e2e="order_by-dropdown"]'
    },
    endpointOrderByChoice: {
      selector: '[data-e2e="dropdown-choice-created_at (descending)"]'
    },
    endpointCloseSummary: {
      selector: 'button[data-e2e="data-endpoint-close-summary"]'
    },
    enpointListItemClassName: {
      selector: `div[data-e2e="${utils.addSuffix('data-endpoint')}-data-enpoint-class-name"]`
    }
  }
};
