import utils from '../../e2e/utils';

const createTestGCMDevices = (tempAccount, gcmAmount) => {
  const gcmDevices = [];
  const gcmDevicesNames = [];

  for (let i = 0; i < gcmAmount; i++) {
    const label = 'android_' + Date.now() + i;
    gcmDevicesNames.push(label);
    gcmDevices.push(tempAccount.connection.GCMDevice({
      label,
      registration_id: utils.randomString(64)
    }));
  }

  return tempAccount.connection.GCMDevice
    .please()
    .bulkCreate(gcmDevices)
    .then(() => {
      tempAccount.tempGCMDevicesNames = gcmDevicesNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
};

export default createTestGCMDevices;
