export default {
  elements: {
    syncanoLogo: {
      selector: '//li[@class="active"]/a[text()="Documentation"]',
      locateStrategy: 'xpath'
    },
    docsTarget: {
      selector: '[class="cover show"]'
    },
    gettingStartedTarget: {
      selector: '*[data-id="quickstart-guide"]'
    },
    instancesTarget: {
      selector: '*[data-e2e="instances-page-title"]'
    }
  }
};
