import commonElementsPage from './commonElementsPage';
import utils from '../utils';

export default {
  url: `${utils.testBaseUrl()}/#/account`,
  elements: {
    updateButton: {
      selector: '[data-e2e="profile-update-button"]'
    },
    innerToolbar: {
      selector: '[data-e2e="inner-toolbar"]'
    },
    firstName: {
      selector: 'input[name=firstName]'
    },
    lastName: {
      selector: 'input[name=lastName]'
    },
    ...commonElementsPage
  }
};
