import instances from '../../tempInstances.js';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['paymentMethods', 'newTool'],
  before: (client) => {
    const accountKey = instances.account.account_key;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'User adds Payment Method': (client) => {
    const paymentPage = client.page.billingPaymentPage();

    paymentPage
      .navigate()
      .fillInput('@cardNumberInput', '4000056655665556')
      .fillInput('@cardMonthInput', '10')
      .fillInput('@cardYearInput', '20')
      .fillInput('@cardCVCInput', '666')
      .click('@addPaymentButton')
      .waitForElementVisible('@updatePaymentButton');
  },
  'User updates Payment Method': (client) => {
    const paymentPage = client.page.billingPaymentPage();
    const visibleEndNumber = '**** **** **** 4444';

    paymentPage
      .navigate()
      .clickElement('@updatePaymentButton')
      .fillInput('@cardNumberInput', '5555555555554444')
      .fillInput('@cardMonthInput', '11')
      .fillInput('@cardYearInput', '22')
      .fillInput('@cardCVCInput', '777')
      .click('@addPaymentButton')
      .waitForElementVisible('@filledOutCard')
      .assert.containsText('@visibleCardNumber', visibleEndNumber);
  },
  'User deletes Payment Method': (client) => {
    const paymentPage = client.page.billingPaymentPage();

    paymentPage
      .navigate()
      .clickElement('@removePaymentButton')
      .click('@confirmRemoveButton')
      .waitForElementVisible('@addPaymentButton');
  }
});
