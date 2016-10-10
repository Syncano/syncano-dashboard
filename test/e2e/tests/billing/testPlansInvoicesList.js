import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['invoices'],
  beforeEach: (client) => {
    const { account_key: accountKey } = instances.account;

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
