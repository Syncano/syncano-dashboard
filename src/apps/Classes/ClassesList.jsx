import React from 'react';
import _ from 'lodash';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './ClassesActions';
import Store from './ClassesStore';

import ListItem from './ClassesListItem';
import { ColumnList, Loading, Dialog, Lists } from '../../common/';

const Column = ColumnList && ColumnList.Column;

export default React.createClass({
  displayName: 'ClassesList',

  mixins: [DialogsMixin],

  componentWillUpdate(nextProps) {
    console.info('ClassesList::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  getAssociatedClasses() {
    const checkedClasses = Store.getCheckedItems();

    const associatedClasses = _.filter(checkedClasses, (checkedClass) => {
      checkedClass.triggers = _.map(_.filter(this.props.triggers, 'class', checkedClass.name), 'label');
      return checkedClass.triggers.length > 0;
    });

    return associatedClasses;
  },

  getAssociationsList(associationsFor, associatedItems) {
    const hasItems = associatedItems.length > 0;
    const list = {
      triggers: null,
      notAssociated: null
    };

    if (hasItems) {
      list.triggers = (
        <div>
          Associated with Triggers: {this.getDialogList(associatedItems, 'name', associationsFor)}
        </div>
      );
      list.notAssociated = (
        <div>
          Not associated: {this.getDialogList(associatedItems, 'name')}
        </div>
      );
    }

    return list[associationsFor];
  },

  isProtectedFromDelete(item) {
    return item.protectedFromDelete;
  },

  initDialogs() {
    const { isLoading } = this.props;
    const checkedClasses = Store.getCheckedItems();
    const classesAssociatedWithTriggers = this.getAssociatedClasses();
    const classesNotAssociated = _.difference(checkedClasses, classesAssociatedWithTriggers);
    const deleteDialog = {
      dialog: Dialog.Delete,
      params: {
        key: 'deleteClassDialog',
        ref: 'deleteClassDialog',
        title: 'Delete a Data Class',
        handleConfirm: Actions.removeClasses,
        items: checkedClasses,
        groupName: 'Class',
        isLoading
      }
    };

    if (classesAssociatedWithTriggers.length) {
      const associatedWithTriggersList = this.getAssociationsList('triggers', classesAssociatedWithTriggers);
      const notAssociatedList = this.getAssociationsList('notAssociated', classesNotAssociated);

      deleteDialog.params.children = (
        <div>
          {`Some of checked Data Classes are associated with Triggers. Do you really want to delete
          ${Store.getDeleteItemsPhrase('Class')}?`}
          {notAssociatedList}
          {associatedWithTriggersList}
          <Loading
            type="linear"
            position="bottom"
            show={isLoading}
          />
        </div>
      );
    }

    return [deleteDialog];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`classes-list-item-${item.name}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('deleteClassDialog', item)}
      />
    );
  },

  render() {
    const { items } = this.props;
    const checkedItems = Store.getCheckedItems();
    const checkedItemsCount = Store.getNumberOfChecked();
    const someClassIsProtectedFromDelete = checkedItems.some(this.isProtectedFromDelete);

    return (
      <Lists.Container className="classes-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
          >
            Data Classes
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"
          >
            Data Objects
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="ID"
            className="col-flex-1"
          >
            Group ID
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"
          >
            Permissions
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItemsCount}
              handleSelectAll={Actions.selectAll}
              handleUnselectAll={Actions.uncheckAll}
              itemsCount={items.length}
            >
              <Lists.MenuItem
                disabled={someClassIsProtectedFromDelete}
                onTouchTap={() => this.showDialog('deleteClassDialog')}
              />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          emptyItemContent="Add a Data Class"
          emptyItemHandleClick={Actions.showDialog}
          key="classes-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});
