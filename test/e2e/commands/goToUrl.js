// Command that helps to navigate to proper url for given instance and endpoint
// Used as url is not compatible with pageObjects directly, forcing to break
// command chaining.
import utils from '../utils';

exports.command = function goToUrl(instanceName, endpoint) {
  const baseUrl = utils.testBaseUrl();

  return this
    .url(`${baseUrl}/#/instances/${instanceName}/${endpoint}`)
    .pause(2000);
};
