import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['planUsage'],
  beforeEach: (client) => {
    const { accountKey } = accounts.instanceUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  afterEach: (client, done) => {
    client.end(done);
  },
  'User views Plan Usage': (client) => {
    const planusagePage = client.page.planUsagePage();
    const usageChartsSelector = planusagePage.elements.usageCharts.selector;

    planusagePage
      .navigate()
      .waitForElementPresent('@planUsageTitle')
      .waitForElementPresent('@usageWithCurrentPlanText')
      .assert.containsText('@usageWithCurrentPlanText', 'Usage with your current plan:')
      .waitForElementVisible('@apiCallsText')
      .assert.containsText('@apiCallsText', 'API calls')
      .assert.containsText('@scriptSecondsText', 'Script seconds')
      .selectDropdownValue('@instancePlanDropdown', accounts.instanceUser.instanceName)
      .assert.containsText('@instancePlanDropdown', accounts.instanceUser.instanceName)
      .waitForElementVisible('@usageCharts')
      .assertSelectedCount('xpath', usageChartsSelector, 3);
  }
});
