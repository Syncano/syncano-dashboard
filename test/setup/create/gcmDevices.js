import connection from '../create/connection';
import utils from '../../e2e/utils';
import _ from 'lodash';

const createTestGCMDevices = (gcmAmount = 1) => {
  const gcmDevices = _.times(gcmAmount, (index) => {
    const label = `android_${Date.now()}${index}`;

    return connection.get().GCMDevice({
      label,
      registration_id: utils.randomString(64)
    });
  });

  return connection.get().GCMDevice
    .please()
    .bulkCreate(gcmDevices)
    .then((response) => {
      const gcmDevicesNames = response.map((createdDevice) => createdDevice.label);

      return gcmDevicesNames;
    })
    .catch((error) => console.log(error));
};

export default createTestGCMDevices;
