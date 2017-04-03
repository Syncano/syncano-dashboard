import Reflux from 'reflux';
import _ from 'lodash';

import { DialogStoreMixin, SnackbarNotificationMixin, StoreFormMixin } from '../../mixins';

import Actions from './InstanceDialogActions';
import InstancesStore from './InstancesStore';
import InstancesActions from './InstancesActions';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

import Constants from '../../constants/Constants';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    DialogStoreMixin,
    SnackbarNotificationMixin,
    StoreFormMixin
  ],

  getInitialState() {
    return {
      name: null,
      isLoading: false,
      metadata: {},
      fullBackups: [],
      selectedBackup: 'null'
    };
  },

  init() {
    this.listenToForms();
  },

  genUniqueName() {
    const adjectives = Constants.INSTANCE_NAME_ADJECTIVES;
    const nouns = Constants.INSTANCE_NAME_NOUNS;
    const sampleAdjective = _.sample(nouns);
    const sampleNoun = _.sample(adjectives);
    const sampleNumber = _.random(999, 10000);

    return `${sampleAdjective}-${sampleNoun}-${sampleNumber}`;
  },

  onCreateInstance() {
    this.trigger({ isLoading: true });
  },

  onCreateInstanceCompleted(data) {
    const { name } = data;

    InstancesActions.fetch();
    SessionActions.fetchInstance(name);
    SessionStore.getRouter().push(`/instances/${name}`);
    this.dismissDialog();
  },

  onCreateInstanceFailure() {
    this.trigger({ isLoading: false });
  },

  onUpdateInstance() {
    this.trigger({ isLoading: true });
  },

  onUpdateInstanceCompleted() {
    this.dismissDialog();
    InstancesActions.fetchInstances();
  },

  onUpdateInstanceFailure() {
    this.trigger({ isLoading: false });
  },

  onRenameInstance() {
    this.trigger({ isLoading: true });
  },

  onRenameInstanceCompleted() {
    this.dismissDialog();
    InstancesActions.fetchInstances();
    InstancesStore.redirectToInstancesList();
  },

  onRenameInstanceFailure() {
    this.trigger({ isLoading: false });
  },

  onRenameAndUpdateInstance() {
    this.trigger({ isLoading: true });
  },

  onRenameAndUpdateInstanceCompleted() {
    this.dismissDialog();
    InstancesActions.fetchInstances();
    InstancesStore.redirectToInstancesList();
  },

  onRenameAndUpdateInstanceFailure() {
    this.trigger({ isLoading: false });
  },

  onRemoveInstancesCompleted() {
    this.dismissDialog();
    InstancesActions.fetchInstances();
    InstancesStore.redirectToInstancesList();
  },

  onFetchAllFullBackupsCompleted(fullBackups) {
    this.fullBackups = fullBackups;
    this.trigger({ fullBackups });
  },

  onCreateInstanceFromBackup() {
    this.trigger({ isRestoring: true });
  },

  onCreateInstanceFromBackupCompleted(data) {
    const { instanceName } = data;

    InstancesActions.fetchInstances();

    setTimeout(() => {
      this.trigger({ isRestoring: false });
      this.dismissDialog();
      SessionStore.getRouter().push({ name: 'sockets', params: { instanceName } });
      this.setSnackbarNotification({ message: 'Your instance was successfully restored' });
    }, 10000);
  },

  onCreateInstanceFromBackupFailure() {
    this.trigger({ isRestoring: false });
  }
});
