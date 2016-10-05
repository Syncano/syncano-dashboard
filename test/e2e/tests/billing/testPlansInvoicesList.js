import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['invoices'],
  beforeEach: (client) => {
    const { accountKey } = accounts.alternativeUser;

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
