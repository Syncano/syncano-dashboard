import React from 'react';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './ProfileInvitationsActions';
import Store from './ProfileInvitationsStore';

// Components
import { ColumnList, Dialog, Lists } from '../../common/';
import ListItem from './ProfileInvitationsListItem';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ProfileInvitationsList',

  mixins: [DialogsMixin],

  componentWillUpdate(nextProps) {
    console.info('ProfileInvitations::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    return [
      {
        dialog: Dialog.Delete,
        params: {
          key: 'acceptInvitationsDialog',
          ref: 'acceptInvitationsDialog',
          title: 'Accept an Invitation',
          handleConfirm: Actions.acceptInvitations,
          isLoading: this.props.isLoading,
          items: Store.getCheckedItems(),
          actionName: 'accept',
          itemLabelName: 'inviter',
          groupName: 'Invitation'
        }
      },
      {
        dialog: Dialog.Delete,
        params: {
          key: 'declineInvitationsDialog',
          ref: 'declineInvitationsDialog',
          title: 'Decline an Invitation',
          handleConfirm: Actions.declineInvitations,
          isLoading: this.props.isLoading,
          items: Store.getCheckedItems(),
          actionName: 'decline',
          itemLabelName: 'inviter',
          groupName: 'Invitation'
        }
      }
    ];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`profile-invitations-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showAcceptDialog={() => this.showDialog('acceptInvitationsDialog', item)}
        showDeclineDialog={() => this.showDialog('declineInvitationsDialog', item)}
      />
    );
  },

  render() {
    const checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
          >
            Instance
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">From</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Role</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              handleSelectAll={Actions.selectAll}
              handleUnselectAll={Actions.uncheckAll}
            >
              <Lists.MenuItem
                primaryText="Accept All"
                onTouchTap={() => this.showDialog('acceptInvitationsDialog')}
              />
              <Lists.MenuItem
                primaryText="Decline All"
                onTouchTap={() => this.showDialog('declineInvitationsDialog')}
              />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="profile-invitations-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});
