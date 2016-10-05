import Syncano from 'syncano';
import utils from '../../e2e/utils';

const createAPNSSocket = (tempAccount) => {
  if (!process.env.CI) {
    tempAccount.tempAPNSSocket = false;
    return tempAccount;
  }
  return tempAccount.connection
    .APNSConfig
    .please()
    .update({}, {
      development_certificate: Syncano.file('./cert.p12'),
      development_certificate_name: utils.randomString(10),
      development_bundle_identifier: utils.randomString(5)
    })
    .then(() => {
      tempAccount.tempAPNSSocket = true;
      return tempAccount;
    });
};

export default createAPNSSocket;
