export default {
  elements: {
    syncanoLogo: {
      selector: '//li[@class="active"]/a[text()="Documentation"]',
      locateStrategy: 'xpath'
    },
    docsTarget: {
      selector: 'section[@class="cover"]',
      locateStrategy: 'xpath'
    },
    gettingStartedTarget: {
      selector: '*[data-id="quickstart-guide"]',
      locateStrategy: 'xpath'
    },
    instancesTarget: {
      selector: '*[data-e2e="instances-page-title"]',
      locateStrategy: 'xpath'
    }
  }
};
