import Syncano from 'syncano';
import fs from 'fs';
import https from 'https';

import globals from '../../e2e/globals';

const getCertFile = () => {
  const baseUrl = globals.apiBaseUrl;
  const credentials = {
    email: process.env.NIGHTWATCH_EMAIL,
    password: process.env.NIGHTWATCH_PASSWORD
  };
  const certTargetInfo = {
    certClassName: 'apns_cert',
    dataObjectWithCertId: 3163,
    certFileName: 'cert.p12',
    instanceName: 'long-frost-7585'
  };
  const connection = Syncano({
    baseUrl,
    defaults: {
      instanceName: certTargetInfo.instanceName,
      className: certTargetInfo.certClassName
    }
  });

  connection
    .Account
    .login(credentials)
    .then((accountDetails) => {
      connection.accountKey = accountDetails.account_key;

      return connection
        .DataObject
        .please()
        .get({ id: certTargetInfo.dataObjectWithCertId });
    })
    .then((dataObject) => {
      const certFile = fs.createWriteStream(certTargetInfo.certFileName);

      https.get(dataObject.cert.value, (resp) => {
        resp.on('data', (data) => {
          certFile.write(data);
        });

        resp.on('end', () => console.log(`\n> Downloaded: ./${certTargetInfo.certFileName}\n`));
      });
    });
  return;
};

export default getCertFile;
