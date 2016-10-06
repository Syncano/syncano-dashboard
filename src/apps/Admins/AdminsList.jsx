import React from 'react';
import Actions from './AdminsActions';
import Store from './AdminsStore';
import AdminsInvitationsActions from './AdminsInvitationsActions';

// Utils
import { DialogsMixin } from '../../mixins';

// Components
import ListItem from './AdminsListItem';
import { ColumnList, Dialog, Lists } from '../../common/';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'AdminsList',

  mixins: [DialogsMixin],

  componentWillUpdate(nextProps) {
    console.info('Admins::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteAdminDialog',
        ref: 'deleteAdminDialog',
        title: 'Remove an Administrator',
        handleConfirm: Actions.removeAdmins,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        itemLabelName: 'email',
        groupName: 'Administrator'
      }
    }];
  },

  checkItem(id, state) {
    AdminsInvitationsActions.uncheckAll();
    Actions.checkItem(id, state);
  },

  renderItem(item) {
    return (
      <ListItem
        key={`admins-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('deleteAdminDialog', item)}
      />
    );
  },

  render() {
    const checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container
        style={{ marginBottom: 48 }}
        className="admins-list"
      >
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            className="col-xs-25 col-md-20"
          >
            Administrators
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC" />
          <Column.ColumnHeader columnName="TEXT">Role</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE" />
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              handleSelectAll={Actions.selectAll}
              handleUnselectAll={Actions.uncheckAll}
            >
              <Lists.MenuItem onTouchTap={() => this.showDialog('deleteAdminDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          checkItem={this.checkItem}
          key="admins-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});
