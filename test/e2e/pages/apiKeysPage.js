import utils from '../utils';

export default {
  elements: {
    addApiKeyButton: {
      selector: 'button[data-e2e="api-keys-add-button"]'
    },
    createModalDescriptionInput: {
      selector: 'input[name="description"]'
    },
    createModalIgnoreACLInput: {
      selector: 'input[name="ignore_acl"]'
    },
    createModalAllowUserCreate: {
      selector: 'input[name="allow_user_create"]'
    },
    createApiKeyButton: {
      selector: 'button[data-e2e="api-keys-submit"]'
    },
    confirmButton: {
      selector: 'button[data-e2e="api-key-delete-dialog-confirm"]'
    },
    apiKeysTableRow: {
      selector: `div[data-e2e="${utils.addSuffix('')}-list-item-name"]`
    },
    apiKeyValue: {
      selector: `div[data-e2e="${utils.addSuffix('')}-list-item-description"`
    }
  }
};
