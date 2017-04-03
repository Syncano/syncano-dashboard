import React from 'react';
import Radium from 'radium';

import Actions from './GroupsActions';

import ListItem from './GroupsListItem';
import { ColumnList, Lists } from '../../common/';

const Column = ColumnList.Column;

export default Radium(React.createClass({
  displayName: 'GroupsList',

  renderItem(item) {
    return (
      <ListItem
        key={`groups-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeGroupDialog', item)}
      />
    );
  },

  render() {
    return (
      <Lists.Container className="groups-list">
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            className="col-flex-1"
          >
            Groups
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          emptyItemContent="Add a Group"
          emptyItemHandleClick={Actions.showDialog}
          key="groups-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
}));
