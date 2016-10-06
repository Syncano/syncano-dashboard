import utils from '../utils';

export default {
  elements: {
    createBackupButton: {
      selector: '[data-e2e="backup-create-backup-button"]'
    },
    createModalLabelInput: {
      selector: 'input[name="label"]'
    },
    createModalDescriptionInput: {
      selector: 'input[name="description"]'
    },
    confirmBackupButton: {
      selector: '[data-e2e="backup-submit"]'
    },
    backupTableRow: {
      selector: `[data-e2e="${utils.addSuffix('')}-list-item-name"]`
    },
    confirmDeleteButton: {
      selector: '[data-e2e="backup-delete-dialog-confirm"]'
    },
    fullBackupsEmptyListItem: {
      selector: '[data-e2e="full-backups-empty-list-item"]'
    }
  }
};
