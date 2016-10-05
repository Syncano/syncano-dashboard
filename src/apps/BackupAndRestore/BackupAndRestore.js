import React from 'react';

import FullBackupActions from './Full/FullBackupsActions';
// import RestoreFromFileDialogActions from './RestoreFromFileDialogActions';

import BackupsInnerToolbar from './BackupsInnerToolbar';
import FullBackupsDialog from './Full/FullBackupsDialog';
import RestoreFromFileDialog from './RestoreFromFileDialog';
import RestoreDialog from './RestoreDialog';
import { RaisedButton } from 'material-ui';

const BackupAndRestore = ({ children }) => (
  <div>
    <RestoreDialog />
    <FullBackupsDialog />
    <RestoreFromFileDialog />
    <BackupsInnerToolbar>
      {/* eslint-disable no-inline-comments */}
      {/* <RaisedButton
       label="Restore from file"
       primary={true}
       style={{marginRight: 0}}
       onTouchTap={RestoreFromFileDialogActions.showDialog} /> */}
      <RaisedButton
        data-e2e="backup-create-backup-button"
        label="Create Backup"
        primary={true}
        style={{ marginRight: 0 }}
        onTouchTap={FullBackupActions.showDialog}
      />
    </BackupsInnerToolbar>
    {children}
  </div>
);

export default BackupAndRestore;
