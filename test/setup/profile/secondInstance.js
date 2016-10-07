import connection from '../create/connection';

import createInstance from '../create/instance';
import createTestClasses from '../create/classes';
import createTestDataEndpoints from '../create/dataEndpoint';
import createTestScripts from '../create/scripts';
import createAPNSSocket from '../create/apnsSocket';
import createGCMSocket from '../create/gcmSocket';
import createAPNSDevices from '../create/apnsDevices';
import createGCMDevices from '../create/gcmDevices';

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

      return createTestDataEndpoints(classNames[0], 2);
    })
    .then((dataEndpointsNames) => {
      secondInstanceStructure.dataEndpointsNames = dataEndpointsNames;

      return createTestScripts(1);
    })
    .then((scriptsNames) => {
      secondInstanceStructure.scriptsNames = scriptsNames;

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

      return secondInstanceStructure;
    });
};

export default secondInstance;
