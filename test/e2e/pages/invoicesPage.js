import utils from '../utils';

export default {
  url: `${utils.testBaseUrl()}/#/account/invoices/`,
  elements: {
    emptyInvoicesView: {
      selector: '//span[@class="synicon-file-outline"]',
      locateStrategy: 'xpath'
    },
    invoicesPageTitle: {
      selector: '[data-e2e="invoices-page-title"]'
    },
    invoiceAmountColumn: {
      selector: '(//div[@class="invoices-list"]//div[@class="description-field col-flex-1"])[3]',
      locateStrategy: 'xpath'
    }
  }
};
