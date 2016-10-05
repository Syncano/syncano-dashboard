import connection from '../create/connection';
import utils from '../../e2e/utils';
import _ from 'lodash';

const createAPNSDevices = (apnsAmount) => {
  const apnsDevices = _.times(apnsAmount, (index) => {
    const label = `ios_${Date.now()}${index}`;

    return connection.get().APNSDevice({
      label,
      registration_id: utils.randomString(64)
    });
  });

  return connection.get().APNSDevice
    .please()
    .bulkCreate(apnsDevices)
    .then((response) => {
      const apnsDevicesNames = response.map((createdDevice) => createdDevice.label);

      return apnsDevicesNames;
    })
    .catch((error) => console.log(error));
};

export default createAPNSDevices;
