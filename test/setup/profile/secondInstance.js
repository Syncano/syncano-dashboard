import connection from '../create/connection';

import createInstance from '../create/instance';
import createTestClasses from '../create/classes';
import createAPNSSocket from '../create/apnsSocket';
import createGCMSocket from '../create/gcmSocket';
import createAPNSDevices from '../create/apnsDevices';
import createGCMDevices from '../create/gcmDevices';
import createHostingSocket from '../create/hostingSocket';

const secondInstance = () => {
  const secondInstanceStructure = {};

  return createInstance()
    .then((instanceName) => {
      secondInstanceStructure.instanceName = instanceName;

      connection.setInstance(instanceName);
      return createTestClasses(3);
    })
    .then((classNames) => {
      secondInstanceStructure.classNames = classNames;

      return createAPNSSocket();
    })
    .then((apnsSocketState) => {
      secondInstanceStructure.apnsSocketState = apnsSocketState;

      return createGCMSocket();
    })
    .then((gcmSocketState) => {
      secondInstanceStructure.gcmSocketState = gcmSocketState;

      return createAPNSDevices(1);
    })
    .then((apnsDevicesNames) => {
      secondInstanceStructure.apnsDevicesNames = apnsDevicesNames;

      return createGCMDevices(1);
    })
    .then((gcmDevicesNames) => {
      secondInstanceStructure.gcmDevicesNames = gcmDevicesNames;

      return createHostingSocket();
    })
    .then((hostingName) => {
      secondInstanceStructure.hostingName = hostingName;

      return secondInstanceStructure;
    });
};

export default secondInstance;
