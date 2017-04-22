import _ from 'lodash';

const NIGHTWATCH_METHODS = ['tags', 'before', 'after', 'afterEach', 'beforeEach'];
const addTestNamePrefixes = (config) => {
  const prefix = config.tags.join(',');

  return _.mapKeys(config, (value, key) => {
    if (_.includes(NIGHTWATCH_METHODS, key)) {
      return key;
    }

    return `[${prefix}] ${key}`;
  });
};

export { addTestNamePrefixes };

const utils = {
  suffix: `_${new Date().getTime()}${_.random(0, 99999)}`,

  addSuffix(text) {
    if (typeof text === 'undefined') {
      return this.suffix;
    }

    return text.toString() + this.suffix;
  },

  // Separate funcition for hosting names as we cannot use '_' in naming
  getHostingName() {
    return `hosting${this.suffix.substring(1)}`;
  },

  // Method to determine wether to use COMMAND or CONTROL key
  // Based on the operating system. The unicode values are taken from the W3 Webdriver spec:
  // https://www.w3.org/TR/webdriver/#character-types
  cmdOrCtrl() {
    if (process.platform === 'darwin') {
      return '\uE03D';
    }

    return '\uE009';
  },

  testBaseUrl() {
    return 'https://localhost:8080';
  },

  jinjaTemplate() {
    return '{% set name = response.name %} {% if name %} {{- timestamp -}}{{\',\' -}}{{- name -}} {% endif %}';
  },

  randomString(length) {
    const possible = 'ABCDEFabcdef0123456789';
    let apiKey = '';

    for (let i = 0; i < length; i += 1) {
      apiKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return apiKey;
  },

  randomInt(min, max) {
    return Math.floor((Math.random() * max) + min);
  },

  splitTestBaseEmail() {
    const email = process.env.CI_BASE_EMAIL || process.env.E2E_EMAIL;
    const splittedEmail = {};

    [splittedEmail.emailName, splittedEmail.emailDomain] = email.split('@');

    return splittedEmail;
  },

  getTestFileLocation() {
    return require('path').resolve(`${__dirname}/../../simplefilename.testfile`);
  }
};

export default utils;
