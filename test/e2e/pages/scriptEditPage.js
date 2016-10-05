export default {
  elements: {
    scriptEditView: {
      selector: '//div[@id="editorSource"]',
      locateStrategy: 'xpath'
    },
    config: {
      selector: '//div/span[text()="Config"]',
      locateStrategy: 'xpath'
    },
    configKeyField: {
      selector: '//div[@class="config-input-key"]',
      locateStrategy: 'xpath'
    },
    configValueField: {
      selector: '//div[@class="config-input-value"]',
      locateStrategy: 'xpath'
    },
    configAddFieldButton: {
      selector: '//button[@class="add-field-button"]',
      locateStrategy: 'xpath'
    },
    traces: {
      selector: '[data-e2e="script-traces-button"]'
    },
    tracesEmpty: {
      selector: '//p[text()="There are no traces for this "]',
      locateStrategy: 'xpath'
    },
    tracesRefresh: {
      selector: '[data-e2e="script-traces-refresh-button"]'
    },
    tracesClose: {
      selector: '(//span[@class="synicon-close"])[1]',
      locateStrategy: 'xpath'
    },
    scriptSuccess: {
      selector: '[data-e2e="success-list-item-name"]'
    }
  }
};
