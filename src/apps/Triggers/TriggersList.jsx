import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import Actions from './TriggersActions';
import Store from './TriggersStore';
import ScriptsStore from '../Scripts/ScriptsStore';

// Utils
import { DialogsMixin } from '../../mixins';

// Components
import ListItem from './TriggersListItem';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, Dialog, Lists, EmptyView } from '../../common/';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'TriggersList',

  mixins: [
    Reflux.connect(ScriptsStore, 'scripts'),
    DialogsMixin
  ],

  getDefaultProps() {
    return {
      getCheckedItems: Store.getCheckedItems,
      checkItem: Actions.checkItem,
      handleSelectAll: Actions.selectAll,
      handleUnselectAll: Actions.uncheckAll
    };
  },

  componentWillUpdate(nextProps) {
    console.info('Triggers::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const { isLoading, getCheckedItems } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeTriggerDialog',
        ref: 'removeTriggerDialog',
        title: 'Delete a Trigger',
        handleConfirm: Actions.removeTriggers,
        items: getCheckedItems(),
        itemLabelName: 'label',
        groupName: 'Trigger',
        isLoading
      }
    }];
  },

  renderItem(item) {
    const { checkItem } = this.props;
    const { scripts } = this.state;
    const scriptObj = _.find(scripts.items, { id: item.script });

    return (
      <ListItem
        key={`triggers-list-item-${item.id}`}
        onIconClick={checkItem}
        item={item}
        scriptLabel={scriptObj ? scriptObj.label : ''}
        showDeleteDialog={() => this.showDialog('removeTriggerDialog', item)}
      />
    );
  },

  render() {
    const {
      handleTitleClick,
      handleSelectAll,
      handleUnselectAll,
      getCheckedItems,
      items,
      isLoading,
      style,
      ...other
    } = this.props;

    if ((!items || !items.length) && !isLoading) {
      return (
        <EmptyView
          iconClassName="synicon-socket-trigger"
          iconColor={Colors.amber400}
          title="Triggers"
          urlLabel="Triggers"
          description="Execute a Script when your data is created, updated or deleted."
          docsUrl="http://docs.syncano.io/docs/triggers"
          handleClick={Actions.showDialog}
          buttonLabel="Add Trigger"
        />
      );
    }

    return (
      <Lists.Container
        style={style}
        className="triggers-list"
      >
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            handleClick={handleTitleClick}
          >
            Triggers
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"
          >
            Data Objects
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"
          >
            Script
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-flex-1"
            columnName="DESC"
          >
            Traces
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-flex-1"
            columnName="DESC"
          >
            Signal
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={getCheckedItems().length}
              handleSelectAll={handleSelectAll}
              handleUnselectAll={handleUnselectAll}
            >
              <Lists.MenuItem onTouchTap={() => this.showDialog('removeTriggerDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...other}
          isLoading={isLoading}
          items={items}
          emptyItemContent="Add a Trigger Socket"
          emptyItemHandleClick={Actions.showDialog}
          key="triggers-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});
