import connection from '../create/connection';

import createInstance from '../create/instance';
import createTestClasses from '../create/classes';
import createTestScripts from '../create/scripts';
// import createAPNSSocket from '../create/apnsSocket';
import createGCMSocket from '../create/gcmSocket';
import createAPNSDevices from '../create/apnsDevices';
import createGCMDevices from '../create/gcmDevices';

const firstInstance = () => {
  const firstInstanceStructure = {};

  return createInstance()
    .then((instanceName) => {
      firstInstanceStructure.instanceName = instanceName;

      connection.setInstance(instanceName);
      return createTestClasses(3);
    })
    .then((classNames) => {
      firstInstanceStructure.classNames = classNames;

      return createTestScripts(3);
    })
    .then((scriptsNames) => {
      firstInstanceStructure.scriptsNames = scriptsNames;

    //   return createAPNSSocket();
    // })
    // .then((apnsSocketState) => {
    //   firstInstanceStructure.apnsSocketState = apnsSocketState;

      return createGCMSocket();
    })
    .then((gcmSocketState) => {
      firstInstanceStructure.gcmSocketState = gcmSocketState;

      return createAPNSDevices(2);
    })
    .then((apnsDevicesNames) => {
      firstInstanceStructure.apnsDevicesNames = apnsDevicesNames;

      return createGCMDevices(2);
    })
    .then((gcmDevicesNames) => {
      firstInstanceStructure.gcmDevicesNames = gcmDevicesNames;

      return firstInstanceStructure;
    });
};

export default firstInstance;
