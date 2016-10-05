import _ from 'lodash';
import { apiBaseUrl } from './globals';
import sampleScripts from '../../src/apps/Scripts/SampleScripts';
import sampleSchemas from '../../src/apps/Classes/SampleSchemas';
import { SNIPPET_TEMPLATE_DATA_SOURCE_TYPES } from '../../src/constants/Constants';

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

  templateDataSourceUrl(instanceName) {
    return `${apiBaseUrl}/v1.1/instances/${instanceName}/classes/user_profile/`;
  },

  randomString(length) {
    const possible = 'ABCDEFabcdef0123456789';
    let apiKey = '';

    for (let i = 0; i < length; i++) {
      apiKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return apiKey;
  },

  randomInt(min, max) {
    return Math.floor((Math.random() * max) + min);
  },

  getGreyedOutStyle(client) {
    const { browserName } = client.capabilities;
    const greyedMap = {
      chrome: 'color: rgba(0, 0, 0, 0.298039)',
      firefox: 'color: rgba(0, 0, 0, 0.3)'
    };

    return greyedMap[browserName] || '';
  },

  getRandomSampleScriptName() {
    return _.sample(sampleScripts).label;
  },

  getRandomSampleClassName() {
    return _.sample(sampleSchemas).name;
  },

  getRandomTemplateContentType() {
    return _.sample(SNIPPET_TEMPLATE_DATA_SOURCE_TYPES);
  },

  splitTestBaseEmail() {
    const email = process.env.TEST_BASE_EMAIL;
    const splittedEmail = {};

    [splittedEmail.emailName, splittedEmail.emailDomain] = email.split('@');

    return splittedEmail;
  }
};

export default utils;
