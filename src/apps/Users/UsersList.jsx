import React from 'react';

import Actions from './UsersActions';

import ListItem from './UsersListItem';
import { ColumnList, Lists } from '../../common/';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'UsersList',

  renderItem(item) {
    return (
      <ListItem
        key={`users-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
      />
    );
  },

  render() {
    return (
      <Lists.Container className="users-list">
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
          >
            Users
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Groups</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Updated</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          emptyItemContent="Add a User"
          emptyItemHandleClick={Actions.showDialog}
          key="users-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});
