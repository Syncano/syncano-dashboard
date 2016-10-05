import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';
import Syncano from 'syncano';

export default addTestNamePrefixes({
  tags: ['pushSocketsApns', 'apns'],
  beforeEach: (client) => {
    const { accountKey } = accounts.navigationUser;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  afterEach: (client, done) => client.end(done),
  'Test Admin Adds APNS Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const filePath = './cert12';
    const { instanceName } = accounts.navigationUser;

    socketsPage
      .goToUrl(instanceName, 'push-notifications/config/')
      .clickElement('@addPushNotificationButton')
      .clickElement('@addApnsSocket')
      .waitForElementPresent('@developmentDropZoneDescription');

    client.execute(`document.querySelectorAll('input[type="file"]')[1].style.display = 'block';
                    document.querySelectorAll('input[type="file"]')[1].style.visibility = 'visible';`);

    socketsPage
      .waitForElementPresent('@uploadApnsDevCert')
      .setValue('@uploadApnsDevCert', require('path').resolve(filePath))
      .waitForElementPresent('@apnsDevCertInput')
      .clickElement('@pushNotificationsCancel');
  },
  'Test Admin Removes APNS Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const filePath = './cert.p12';

    const { accountKey } = accounts.navigationUser;
    const { instanceName } = accounts.navigationUser;
    const baseUrl = client.globals.apiBaseUrl;
    const connection = Syncano({
      baseUrl,
      accountKey,
      defaults: {
        instanceName,
        className: 'apns_cert'
      }
    });
    const params = { instanceName };
    const update = {
      development_certificate: Syncano.file(filePath),
      development_certificate_name: 'certName',
      development_bundle_identifier: 'certBundle'
    };

    connection
      .APNSConfig
      .please()
      .update(params, update)
      .then((resp) => {
        console.log('Development certifacte uploaded?: ', resp.development_certificate);
        socketsPage
          .goToUrl(instanceName, 'push-notifications/config/')
          .clickElement('@configPushItem')
          .waitForElementVisible('@apnsDevCertInput')
          .clickElement('@removeApnsCertificate')
          .waitForElementVisible('@developmentDropZoneDescription')
          .clickElement('@pushNotificationsSubmit')
          .waitForElementVisible('@pushSocketsZeroState');
      })
      .catch((err) => console.error(err));
  },
  'Test Admin Goes to APNS Device list': (client) => {
    const socketsPage = client.page.socketsPage();
    const pushDevicesPage = client.page.pushDevicesPage();
    const { instanceName } = accounts.navigationUser;

    // This duplicates action above so additional api calls is done
    // For now there is no other way to do it as tests before it
    // can't properly add push socket
    const { accountKey } = accounts.navigationUser;
    const filePath = './cert.p12';
    const baseUrl = client.globals.apiBaseUrl;
    const connection = Syncano({
      baseUrl,
      accountKey,
      defaults: {
        instanceName,
        className: 'apns_cert'
      }
    });
    const params = { instanceName };
    const update = {
      development_certificate: Syncano.file(filePath),
      development_certificate_name: 'certName',
      development_bundle_identifier: 'certBundle'
    };

    connection
      .APNSConfig
      .please()
      .update(params, update)
      .then((resp) => {
        console.log('Development certifacte uploaded?: ', resp.development_certificate);

        socketsPage
          .goToUrl(instanceName, 'push-notifications/config/')
          .clickElement('@apnsPushSocketDevicesLinkIcon');

        pushDevicesPage.waitForElementVisible('@APNSDevicesEmptyListItem');
      })
      .catch((err) => console.error(err));
  }
});
