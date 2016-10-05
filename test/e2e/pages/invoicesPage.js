import utils from '../utils';

export default {
  url: `${utils.testBaseUrl()}/#/account/invoices/`,
  elements: {
    emptyInvoicesView: {
      selector: '//span[@class="synicon-file-outline"]',
      locateStrategy: 'xpath'
    },
    invoicesPageTitle: {
      selector: '//div[@class="col-flex-1"]//span[text()="Invoices"]',
      locateStrategy: 'xpath'
    },
    invoiceAmountColumn: {
      selector: '(//div[@class="invoices-list"]//div[@class="description-field col-flex-1"])[3]',
      locateStrategy: 'xpath'
    }
  }
};
