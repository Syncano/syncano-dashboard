import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    setClickedBackup: {},

    restoreFromBackup: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.BackupAndRestore.restoreFromBackup'
    }
  },
  {
    withDialog: true
  }
);
