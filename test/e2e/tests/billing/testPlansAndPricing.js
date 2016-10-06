import instances from '../../tempInstances.js';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['plansAndPricing', 'newTool'],
  before: (client) => {
    const accountKey = instances.account.account_key;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'User switches to production plan': (client) => {
    const billingPage = client.page.billingPlanPage();

    billingPage
      .navigate()
      .waitForElementVisible('@openPlansExplorerButton')
      .verify.containsText('@planBarLocator', 'Starter')
      .clickElement('@openPlansExplorerButton')
      .fillInput('@cardNumberInput', '4000056655665556')
      .fillInput('@cardMonthInput', '11')
      .fillInput('@cardYearInput', '21')
      .fillInput('@cardCVCInput', '666')
      .clickElement('@confirmButton')
      .waitForElementVisible('@goBackButton')
      .clickElement('@goBackButton')
      .waitForElementVisible('@planBarLocator')
      .verify.containsText('@planBarLocator', 'Developer');
  },
  'User cancels production plan': (client) => {
    const billingPage = client.page.billingPlanPage();

    billingPage
      .clickElement('@cancelPlanButton')
      .clickElement('@cancelPlanReason')
      .clickElement('@confirmCancelPlanButton')
      .waitForElementVisible('@successfullCancelPlanMessage')
      .clickElement('@cancelPlanMessageBackButton');
  },
  'User sets soft & hard limits on plan usage': (client) => {
    const billingPage = client.page.billingPlanPage();

    billingPage
      .fillInput('@softLimitInput', '10')
      .fillInput('@hardLimitInput', '30')
      .click('@setLimitsButton');
  }
});
