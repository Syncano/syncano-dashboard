import React from 'react';
import Radium from 'radium';

import Actions from './GroupsActions';
import Store from './GroupsStore';

// Utils
import { DialogsMixin } from '../../mixins';

// Components
import ListItem from './GroupsListItem';
import { ColumnList, Dialog, Lists } from '../../common/';

const Column = ColumnList.Column;

export default Radium(React.createClass({
  displayName: 'GroupsList',

  mixins: [DialogsMixin],

  componentWillUpdate(nextProps) {
    console.info('Users::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const { isLoading } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeGroupDialog',
        ref: 'removeGroupDialog',
        title: 'Delete a Group',
        handleConfirm: Actions.removeGroups,
        items: Store.getCheckedItems(),
        itemLabelName: 'label',
        groupName: 'Group',
        isLoading
      }
    }];
  },

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
    const checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container className="groups-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            className="col-flex-1"
          >
            Groups
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              handleSelectAll={Actions.selectAll}
              handleUnselectAll={Actions.uncheckAll}
            >
              <Lists.MenuItem onTouchTap={() => this.showDialog('removeGroupDialog')} />
            </Lists.Menu>
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
