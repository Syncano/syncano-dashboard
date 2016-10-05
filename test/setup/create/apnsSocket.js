import Syncano from 'syncano';
import connection from './connection';
import utils from '../../e2e/utils';

const createAPNSSocket = () => {
  if (!process.env.CI) return false;

  return connection.get()
    .APNSConfig
    .please()
    .update({}, {
      development_certificate: Syncano.file('./cert.p12'),
      development_certificate_name: utils.randomString(10),
      development_bundle_identifier: utils.randomString(5)
    })
    .then((response) => response.development_certificate);
};

export default createAPNSSocket;
