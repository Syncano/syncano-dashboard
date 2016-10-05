import utils from '../utils';

export default {
  elements: {
    createBackupButton: {
      selector: 'button[data-e2e="backup-create-backup-button"]'
    },
    createModalLabelInput: {
      selector: 'input[name="label"]'
    },
    createModalDescriptionInput: {
      selector: 'input[name="description"]'
    },
    confirmBackupButton: {
      selector: 'button[data-e2e="backup-submit"]'
    },
    backupTableRow: {
      selector: `div[data-e2e="${utils.addSuffix('')}-list-item-name"]`
    },
    confirmDeleteButton: {
      selector: 'button[data-e2e="backup-delete-dialog-confirm"]'
    },
    fullBackupsEmptyListItem: {
      selector: '[data-e2e="full-backups-empty-list-item"]'
    }
  }
};
