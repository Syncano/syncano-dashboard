import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';
import _ from 'lodash';

export default addTestNamePrefixes({
  tags: ['planUsage', 'newTool'],
  beforeEach: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  afterEach: (client, done) => client.end(done),
  'User views Plan Usage': (client) => {
    const planUsagePage = client.page.planUsagePage();
    const randomInstance = _.sample(instances).instanceName;
    const usageChartsSelector = planUsagePage.elements.usageCharts.selector;

    planUsagePage
      .navigate()
      .waitForElementPresent('@planUsageTitle')
      .waitForElementPresent('@usageWithCurrentPlanText')
      .assert.containsText('@usageWithCurrentPlanText', 'Usage with your current plan:')
      .waitForElementVisible('@apiCallsText')
      .assert.containsText('@apiCallsText', 'API calls')
      .assert.containsText('@scriptSecondsText', 'Script seconds')
      .selectDropdownValue('@instancePlanDropdown', randomInstance)
      .assert.containsText('@instancePlanDropdown', randomInstance)
      .waitForElementVisible('@usageCharts')
      .assertSelectedCount('xpath', usageChartsSelector, 3);
  }
});
