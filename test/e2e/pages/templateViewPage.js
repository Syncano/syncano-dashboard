import commonElementsPage from './commonElementsPage';

export default {
  elements: {
    codeEditor: {
      selector: '//div[@id="contentEditor"]/textarea',
      locateStrategy: 'xpath'
    },
    codeEditorContent: {
      selector: '//div[@id="contentEditor"]',
      locateStrategy: 'xpath'
    },
    saveButton: {
      selector: '[data-e2e="template-save-button"]'
    },
    contextEditor: {
      selector: '//div[@id="contextEditor"]/textarea',
      locateStrategy: 'xpath'
    },
    contextEditorContent: {
      selector: '//div[@id="contextEditor"]',
      locateStrategy: 'xpath'
    },
    inputDataSourceUrl: {
      selector: 'input[name="dataSourceUrl"]'
    },
    renderButton: {
      selector: '[data-e2e="template-render-button"]'
    },
    renderInTabButton: {
      selector: '[data-e2e="template-render-in-tab-button"]'
    },
    previewEditorContent: {
      selector: '//div[@id="previewEditor"]',
      locateStrategy: 'xpath'
    },
    htmlTestTemplateRow: {
      selector: '//div[text()="objects_html_table"]',
      locateStrategy: 'xpath'
    },
    templateName: {
      selector: '[data-e2e="template-name"]'
    },
    templateContentType: {
      selector: '[data-e2e="template-content-type"]'
    },
    templateSubmitButton: {
      selector: '[data-e2e="templates-submit-button"]'
    },
    templateDialogSummaryTitle: {
      selector: '[data-e2e="dialog-summary-title"]'
    },
    templateCloseButtonSummary: {
      selector: '[data-e2e="templates-close-button-summary"]'
    },
    addStepTitle: {
      selector: '[data-e2e="template-step-title-Add"]'
    },
    editStepTitle: {
      selector: '[data-e2e="template-step-title-Edit"]'
    },
    templateTextCssType: {
      selector: '[data-e2e="text/css-user-option"]'
    },
    ...commonElementsPage
  }
};
