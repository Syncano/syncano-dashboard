import instances from '../../tempInstances';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['pushSocketsApns', 'apns'],
  beforeEach: (client) => {
    const { account_key: accountKey } = instances.account;

    client
      .loginUsingLocalStorage(accountKey)
      .setResolution(client);
  },
  afterEach: (client, done) => client.end(done),
  'Test Admin Adds APNS Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const filePath = './cert12';
    const { instanceName } = instances.thirdInstance;

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
  'Test Admin Goes to APNS Device list': (client) => {
    const socketsPage = client.page.socketsPage();
    const pushDevicesPage = client.page.pushDevicesPage();
    const { instanceName } = instances.secondInstance;

    socketsPage
      .goToUrl(instanceName, 'push-notifications/config/')
      .clickElement('@apnsPushSocketDevicesLinkIcon');

    pushDevicesPage.waitForElementVisible('@firstDevice');
  },
  'Test Admin Removes APNS Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const { instanceName } = instances.secondInstance;

    socketsPage
      .goToUrl(instanceName, 'push-notifications/config/')
      .clickElement('@apnsPushConfig')
      .waitForElementVisible('@apnsDevCertInput')
      .clickElement('@removeApnsCertificate')
      .waitForElementVisible('@developmentDropZoneDescription')
      .clickElement('@pushNotificationsSubmit')
      .waitForElementVisible('@apnsPushConfig')
      .assert.containsText('@apnsPushConfig', 'false');
  }
});
