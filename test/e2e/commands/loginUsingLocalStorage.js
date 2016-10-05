import utils from '../utils.js';

exports.command = function loginUsingLocalStorage(accountToken) {
  const baseUrl = utils.testBaseUrl();

  return this
    .url(`${baseUrl}/#/?token=${accountToken}`)
    .pause(1000);
};
