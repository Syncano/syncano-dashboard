import utils from '../../e2e/utils';

const createGCMSocket = (tempAccount) => {
  return tempAccount.connection
    .GCMConfig
    .please()
    .update({}, {
      production_api_key: utils.randomString(32),
      development_api_key: utils.randomString(32)
    })
    .then(() => {
      tempAccount.createGCMSocket = true;
      return tempAccount;
    });
};

export default createGCMSocket;
