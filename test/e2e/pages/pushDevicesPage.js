export default {
  elements: {
    androidDevicesHeading: {
      selector: '[data-e2e="gcm-devices-list-title"]'
    },
    iosDevicesHeading: {
      selector: '[data-e2e="apns-devices-list-title"]'
    },
    firstDevice: {
      selector: '(//div[@class="col-sm-14"]/div/div/div)[1]',
      locateStrategy: 'xpath'
    },
    APNSDevicesEmptyListItem: {
      selector: '[data-e2e="apns-devices-empty-list-item"]'
    },
    GCMDevicesEmptyListItem: {
      selector: '[data-e2e="gcm-devices-empty-list-item"]'
    }
  }
};
