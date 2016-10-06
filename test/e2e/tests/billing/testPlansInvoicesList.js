import instances from '../../tempInstances.js';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['invoices', 'newTool'],
  beforeEach: (client) => {
    const accountKey = instances.account.account_key;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  afterEach: (client, done) => client.end(done),
  'User views paid Invoices List': (client) => {
    const invoicesPage = client.page.invoicesPage();

    invoicesPage
      .navigate()
      .waitForElementVisible('@invoicesPageTitle')
      .waitForElementVisible('@invoiceAmountColumn')
      .verify.containsText('@invoiceAmountColumn', '$');
  }
});
