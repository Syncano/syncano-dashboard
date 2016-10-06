import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import { DialogsMixin } from '../../../mixins';

import Actions from './FullBackupsActions';
import RestoreDialogActions from '../RestoreDialogActions';
import DetailsDialogActions from './DetailsDialogActions';
import DetailsDialog from './DetailsDialog';
import Store from './FullBackupsStore';

import ListItem from './FullBackupsListItem';
import FullBackupsEmptyView from './FullBackupsEmptyView';
import { ColumnList, Lists, Dialog } from '../../../common';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'FullBackupsList',

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  initDialogs() {
    const { isLoading } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteFullBackupDialog',
        ref: 'deleteFullBackupDialog',
        title: 'Delete Full Backup',
        handleConfirm: Actions.removeFullBackups,
        items: Store.getCheckedItems(),
        itemLabelName: 'label',
        groupName: 'Backup',
        isLoading
      }
    }];
  },

  renderHeader() {
    const { items } = this.props;
    const checkedItems = Store.getNumberOfChecked();

    if (_.isEmpty(items)) {
      return null;
    }

    return (
      <ColumnList.Header>
        <Column.ColumnHeader
          primary={true}
          columnName="CHECK_ICON"
          className="col-sm-10"
        >
          Full Backups
        </Column.ColumnHeader>
        <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
        <Column.ColumnHeader columnName="TEXT">Status</Column.ColumnHeader>
        <Column.ColumnHeader columnName="TEXT">Size</Column.ColumnHeader>
        <Column.ColumnHeader columnName="TEXT">Author</Column.ColumnHeader>
        <Column.ColumnHeader columnName="DATE" />
        <Column.ColumnHeader columnName="MENU">
          <Lists.Menu
            checkedItemsCount={checkedItems}
            handleSelectAll={Actions.selectAll}
            handleUnselectAll={Actions.uncheckAll}
          >
            <Lists.MenuItem onTouchTap={() => this.showDialog('deleteFullBackupDialog')} />
          </Lists.Menu>
        </Column.ColumnHeader>
      </ColumnList.Header>
    );
  },

  renderItem(item) {
    return (
      <ListItem
        key={`full-backup-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDetailsDialog={() => DetailsDialogActions.showDialog(item)}
        showRestoreDialog={RestoreDialogActions.showDialog}
        showDeleteDialog={() => this.showDialog('deleteFullBackupDialog', item)}
      />
    );
  },

  render() {
    return (
      <Lists.Container className="full-backups-list">
        {this.getDialogs()}
        <DetailsDialog />

        {this.renderHeader()}

        <Lists.List
          {...this.props}
          checkItem={this.checkItem}
          key="full-backups-list"
          renderItem={this.renderItem}
          emptyView={<FullBackupsEmptyView />}
        />
      </Lists.Container>
    );
  }
});
