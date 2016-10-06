import utils from '../utils';

exports.command = function loginUsingLocalStorage(accountToken) {
  const baseUrl = utils.testBaseUrl();

  return this
    .url(`${baseUrl}/#/?token=${accountToken}`)
    .pause(1000);
};
