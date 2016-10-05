import accounts from '../tempAccounts';

export default {
  elements: {
    scriptListItem: {
      selector: `//div[text()="${accounts.navigationUser.tempScriptNames[0]}"]`,
      locateStrategy: 'xpath'
    },
    scriptMenuSelect: {
      selector: '(//span[@class="synicon-dots-vertical"])[1]',
      locateStrategy: 'xpath'
    },
    scriptsSelected: {
      selector: '.synicon-checkbox-marked-outline'
    },
    deleteScriptsDialogTitle: {
      selector: '//h3[text()="Delete a Script"]',
      locateStrategy: 'xpath'
    },
    confirmButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    emptyListItem: {
      selector: '[data-e2e="scripts-empty-list-item"]'
    },
    scriptAddButton: {
      selector: '[data-e2e="scripts-toolbar-add-button"]'
    },
    scriptlNameInput: {
      selector: 'input[name="label"]'
    },
    scriptDescriptionInput: {
      selector: 'textarea[name="description"]'
    },
    scriptRuntimeInput: {
      selector: 'input[name="runtime_name"]'
    },
    scriptSubmitButton: {
      selector: '[data-e2e="scripts-submit-button"]'
    },
    scriptCancelButton: {
      selector: '[data-e2e="scripts-cancel-button"]'
    },
    scriptCloseSummaryButton: {
      selector: '[data-e2e="script-close-button-summary"]'
    },
    scriptRunButton: {
      selector: '[data-e2e="script-run-button"]'
    },
    scriptEditorNodeJSFirstLine: {
      selector: '//*[@class="ace_content"]//span[text()="// ARGS, CONFIG and META are three default dictionaries you"]',
      locateStrategy: 'xpath'
    },
    scriptNodeJSOption: {
      selector: '[data-e2e="nodejs-script-runtime-option"]'
    },
    scriptRubyOption: {
      selector: '[data-e2e="ruby-script-runtime-option"]'
    }
  }
};
