import utils from '../utils';

export default {
  url: `${utils.testBaseUrl()}/#/account/usage/`,
  elements: {
    planUsageTitle: {
      selector: '//div[@data-e2e="inner-toolbar"]/div/div/div[text()="Usage"]',
      locateStrategy: 'xpath'
    },
    instancePlanDropdown: {
      selector: '//label[text()="Usage for Instance"]/../div/div',
      locateStrategy: 'xpath'
    },
    usageCharts: {
      selector: '//div[@class="col chart c3"]',
      locateStrategy: 'xpath'
    },
    usageWithCurrentPlanText: {
      selector: '//div[@class="col-flex-1 vp-1-b"]',
      locateStrategy: 'xpath'
    },
    apiCallsText: {
      selector: '//div[@class="row vp-1-b"][1]',
      locateStrategy: 'xpath'
    },
    scriptSecondsText: {
      selector: '//div[@class="row vp-1-b"][2]',
      locateStrategy: 'xpath'
    }
  }
};
