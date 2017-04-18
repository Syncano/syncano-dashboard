import React from 'react';
import _ from 'lodash';

// Utils
import { DialogsMixin } from '../../mixins';
import { colors as Colors } from 'material-ui/styles';

// Stores and Actions
import Actions from './ClassesActions';
import Store from './ClassesStore';

import ListItem from './ClassesListItem';
import { ColumnList, Loading, Dialog, Lists, EmptyView } from '../../common/';

const Column = ColumnList.Column;

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
        item={item}
      />
    );
  },

  render() {
    if (this.props.items.length === 0) {
      return (
        <EmptyView
          title="Data Classes"
          description={`Data Classes are templates for data objects you will store in Syncano.
            In order to be able to add Data Objects, you have to define a Data Class for that type of data object`}
          iconClassName="synicon-socket-data"
          iconColor={Colors.blue600}
          showDocsUrl={false}
        />
      );
    }

    return (
      <Lists.Container className="classes-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-flex-3"
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
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="classes-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});
