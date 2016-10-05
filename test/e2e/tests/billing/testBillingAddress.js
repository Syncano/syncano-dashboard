import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['billingAddress'],
  before: (client) => {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client, done) => client.end(done),
  'User adds Billing Address': (client) => {
    const billingAddressPage = client.page.billingAddressPage();

    billingAddressPage.navigate();
    client.pause(500);

    billingAddressPage
      .fillInput('@companyNameInput', 'E2E Inc.')
      .fillInput('@firstNameInput', 'John')
      .fillInput('@lastNameInput', 'Smith')
      .fillInput('@taxNumberInput', '555-000-555')
      .fillInput('@firstAddressInput', 'Neverland')
      .fillInput('@secondAddressInput', '12/345')
      .fillInput('@countryInput', 'El Salvado')
      .fillInput('@stateNameInput', 'Unknown')
      .fillInput('@zipCodeInput', '00-007')
      .fillInput('@cityInput', 'Norcia')
      .click('@updateButton')
      .waitForElementVisible('@successfulUpdateMessage');
  },
  'User updates Billing Address': (client) => {
    const billingAddressPage = client.page.billingAddressPage();

    billingAddressPage
      .assert.valueContains('@lastNameInput', 'Smith')
      .fillInput('@lastNameInput', 'Snow')
      .fillInput('@taxNumberInput', '555-111-555')
      .fillInput('@secondAddressInput', '67/890')
      .click('@updateButton')
      .waitForElementVisible('@successfulUpdateMessage');
  },
  'User verifies that Billing Address updated': (client) => {
    const billingAddressPage = client.page.billingAddressPage();

    billingAddressPage
      .assert.valueContains('@companyNameInput', 'E2E Inc.')
      .assert.valueContains('@firstNameInput', 'John')
      .assert.valueContains('@lastNameInput', 'Snow')
      .assert.valueContains('@taxNumberInput', '555-111-555')
      .assert.valueContains('@firstAddressInput', 'Neverland')
      .assert.valueContains('@secondAddressInput', '67/890')
      .assert.valueContains('@countryInput', 'El Salvado')
      .assert.valueContains('@stateNameInput', 'Unknown')
      .assert.valueContains('@zipCodeInput', '00-007')
      .assert.valueContains('@cityInput', 'Norcia');
  }
});
