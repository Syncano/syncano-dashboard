import utils from '../utils';

export default {
  url: `${utils.testBaseUrl()}/#/demo-apps/`,
  elements: {
    showDemoAppDetailsButton: {
      selector: '[data-e2e="demo-app-pokemon-map-more-button"]'
    },
    installDemoAppButton: {
      selector: '[data-e2e="demo-app-install-button"]'
    },
    confirmInstallDemoAppButton: {
      selector: '[data-e2e="demo-app-dialog-confirm-button"]'
    },
    currentInstanceName: {
      selector: '[data-e2e="current-instanceName-pokemon-map"]'
    }
  }
};
