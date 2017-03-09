import CreateActions from '../../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    fetchFullBackups: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.BackupAndRestore.listFullBackups'
    },
    removeFullBackups: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.BackupAndRestore.removeFullBackups'
    },
    createFullBackup: {
      asyncResult: true,
      asyncForm: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.BackupAndRestore.createFullBackup'
    }
  },
  {
    withDialog: true,
    withCheck: true
  }
);
