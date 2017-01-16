import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['paymentMethods'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

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
      .click('@addPaymentButton');

    client.pause(3000);

    paymentPage
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
