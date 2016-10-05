import React from 'react';
import { colors as Colors } from 'material-ui/styles/';
import FullBackupsActions from './FullBackupsActions';
import { EmptyView } from '../../../common';

const FullBackupsEmptyView = () => (
  <EmptyView
    data-e2e="full-backups-empty-list-item"
    iconClassName="synicon-backup-restore"
    iconColor={Colors.cyan500}
    title="You don’t have any Backups yet."
    description="Backups allow you to make a snapshot of your instance state."
    urlLabel="Backups"
    docsUrl="http://docs.syncano.io/docs/backup-and-restore-overview/"
    buttonLabel="Create Backup"
    handleClick={FullBackupsActions.showDialog}
  />
);

export default FullBackupsEmptyView;
