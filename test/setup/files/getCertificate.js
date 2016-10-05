import Syncano from 'syncano';
import fs from 'fs';
import https from 'https';

import globals from '../../e2e/globals.js';

const getCertFile = () => {
  const baseUrl = globals.apiBaseUrl;
  const certName = 'cert.p12';
  const credentials = {
    email: process.env.NIGHTWATCH_EMAIL,
    password: process.env.NIGHTWATCH_PASSWORD
  };
  const connection = Syncano({
    baseUrl,
    defaults: {
      instanceName: 'long-frost-7585',
      className: 'apns_cert'
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
        .get({ id: 3163 });
    })
    .then((dataObject) => {
      const certFile = fs.createWriteStream(certName);

      https.get(dataObject.cert.value, (resp) => {
        resp.on('data', (data) => {
          certFile.write(data);
        });

        resp.on('end', () => console.log(`\n> Downloaded: ./${certName}\n`));
      });
    });
  return;
};

export default getCertFile;
