import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['plansAndPricing'],
  before: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  after: (client) => client.end(),
  'User switches to production plan': (client) => {
    const billingPage = client.page.billingPlanPage();
    const currentPlan = 'Starter';
    const targetPlan = 'Developer';
    const targetPrice = '$25';
    const targetPlanDialogText = `Your Current Plan is: ${targetPlan} (${targetPrice} per month)`;

    billingPage
      .navigate()
      .waitForElementVisible('@twentyFiveDolarPlanUpgradeButton')
      .verify.containsText('@planBarLocator', currentPlan)
      .clickElement('@twentyFiveDolarPlanUpgradeButton')
      .fillInput('@cardNumberInput', '4000056655665556')
      .fillInput('@cardMonthInput', '11')
      .fillInput('@cardYearInput', '21')
      .fillInput('@cardCVCInput', '666')
      .clickElement('@confirmButton')
      .waitForElementVisible('@planReceiptDialogCurrent')
      .verify.containsText('@planReceiptDialogCurrent', targetPlanDialogText)
      .clickElement('@goBackButton')
      .waitForElementVisible('@planBarLocator')
      .verify.containsText('@planBarLocator', targetPlan);
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
