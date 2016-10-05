import connection from '../create/connection';

import createInstance from '../create/instance';
import createTestClasses from '../create/classes';
import createTestScripts from '../create/scripts';
import createAPNSSocket from '../create/apnsSocket';
import createGCMSocket from '../create/gcmSocket';
import createAPNSDevices from '../create/apnsDevices';
import createGCMDevices from '../create/gcmDevices';

const firstInstance = () => {
  const firstInstanceStructure = {};

  return createInstance()
    .then((instanceName) => {
      console.log('firstInstance::instanceName', instanceName);
      firstInstanceStructure.instanceName = instanceName;

      connection.setInstance(instanceName);
      return createTestClasses(3);
    })
    .then((classNames) => {
      console.log('firstInstance::classNames', classNames);
      firstInstanceStructure.classNames = classNames;

      return createTestScripts(3);
    })
    .then((scriptsNames) => {
      console.log('firstInstance::scriptsNames', scriptsNames);
      firstInstanceStructure.scriptsNames = scriptsNames;

      return createAPNSSocket();
    })
    .then((apnsSocketState) => {
      console.log('firstInstance::apnsSocketState', apnsSocketState);
      firstInstanceStructure.apnsSocketState = apnsSocketState;

      return createGCMSocket();
    })
    .then((gcmSocketState) => {
      console.log('firstInstance::gcmSocketState', gcmSocketState);
      firstInstanceStructure.gcmSocketState = gcmSocketState;

      return createAPNSDevices(2);
    })
    .then((apnsDevicesNames) => {
      console.log('firstInstance::apnsDevicesNames', apnsDevicesNames);
      firstInstanceStructure.apnsDevicesNames = apnsDevicesNames;

      return createGCMDevices(2);
    })
    .then((gcmDevicesNames) => {
      console.log('firstInstance::gcmDevicesNames', gcmDevicesNames);
      firstInstanceStructure.gcmDevicesNames = gcmDevicesNames;

      return firstInstanceStructure;
    });
};

export default firstInstance;
