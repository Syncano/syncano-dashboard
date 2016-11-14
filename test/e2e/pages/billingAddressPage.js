import commonElementsPage from './commonElementsPage';
import utils from '../utils';

export default {
  url: `${utils.testBaseUrl()}/#/account/address/`,
  elements: {
    companyNameInput: {
      selector: 'input[name="company_name"]'
    },
    firstNameInput: {
      selector: 'input[name="first_name"]'
    },
    lastNameInput: {
      selector: 'input[name="last_name"]'
    },
    taxNumberInput: {
      selector: 'input[name="tax_number"]'
    },
    firstAddressInput: {
      selector: 'input[name="address_line1"]'
    },
    secondAddressInput: {
      selector: 'input[name="address_line2"]'
    },
    countryInput: {
      selector: 'input[name="address_country"]'
    },
    stateNameInput: {
      selector: 'input[name="address_state"]'
    },
    zipCodeInput: {
      selector: 'input[name="address_zip"]'
    },
    cityInput: {
      selector: 'input[name="address_city"]'
    },
    updateButton: {
      selector: '[data-e2e="billing-address-update-button"]'
    },
    ...commonElementsPage
  }
};
