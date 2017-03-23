import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import Actions from './SchedulesActions';
import Store from './SchedulesStore';
import ScriptsStore from '../Scripts/ScriptsStore';

// Utils
import { DialogsMixin } from '../../mixins';

// Components
import ListItem from './SchedulesListItem';
import { ColumnList, Dialog, Lists, EmptyView } from '../../common/';
import { colors as Colors } from 'material-ui/styles';

const Column = ColumnList && ColumnList.Column;

export default React.createClass({
  displayName: 'SchedulesList',

  mixins: [
    Reflux.connect(ScriptsStore, 'scripts'),
    DialogsMixin
  ],

  getDefaultProps() {
    return {
      emptyItemContent: 'Add a Schedule Socket',
      emptyItemHandleClick: Actions.showDialog,
      getCheckedItems: Store.getCheckedItems,
      checkItem: Actions.checkItem,
      handleSelectAll: Actions.selectAll,
      handleUnselectAll: Actions.uncheckAll
    };
  },

  componentWillUpdate(nextProps) {
    console.info('Schedules::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const { isLoading, getCheckedItems } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeScheduleDialog',
        ref: 'removeScheduleDialog',
        title: 'Delete a Schedule Socket',
        handleConfirm: Actions.removeSchedules,
        items: getCheckedItems(),
        itemLabelName: 'label',
        groupName: 'Schedule',
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
        key={`schedules-list-item-${item.id}`}
        onIconClick={checkItem}
        item={item}
        scriptLabel={scriptObj ? scriptObj.label : ''}
        showDeleteDialog={() => this.showDialog('removeScheduleDialog', item)}
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
          iconClassName="synicon-socket-schedule"
          iconColor={Colors.lime400}
          title="Schedule"
          urlLabel="Schedule"
          description="Run Scripts as jobs at desired times or intervals."
          docsUrl="http://docs.syncano.io/docs/schedules"
          handleClick={Actions.showDialog}
          buttonLabel="Add Schedule"
        />
      );
    }

    return (
      <Lists.Container
        className="schedules-list"
        style={style}
      >
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            handleClick={handleTitleClick}
          >
            Schedules
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-flex-1"
            columnName="DATE"
          >
            Next run
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
            Crontab/Interval
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-flex-1"
            columnName="DESC"
          >
            Timezone
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={getCheckedItems().length}
              handleSelectAll={handleSelectAll}
              handleUnselectAll={handleUnselectAll}
              itemsCount={items.length}
            >
              <Lists.MenuItem onTouchTap={() => this.showDialog('removeScheduleDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...other}
          isLoading={isLoading}
          items={items}
          key="schedules-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});
