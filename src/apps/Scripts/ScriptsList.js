import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import { withRouter } from 'react-router';

// Utils
import { DialogsMixin } from '../../mixins';
import { colors as Colors } from 'material-ui/styles';

// Stores and Actions
import Actions from './ScriptsActions';
import Store from './ScriptsStore';

// Components
import ListItem from './ScriptsListItem';
import ScriptsEmptyView from './ScriptsEmptyView';
import { ColumnList, Loading, Dialog, Lists } from '../../common/';

const Column = ColumnList && ColumnList.Column;

const ScriptsList = React.createClass({
  displayName: 'ScriptsList',

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  getDefaultProps() {
    return {
      titleVisible: true,
      emptyView: <ScriptsEmptyView />
    };
  },

  componentWillUpdate(nextProps) {
    console.info('ScriptsList::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  getAssociatedScripts(associatedWith) {
    const checkedScripts = Store.getCheckedItems();

    const associatedScripts = _.filter(checkedScripts, (script) => {
      script[associatedWith] = _.map(_.filter(this.state[associatedWith], ['script', script.id]), 'label');
      return script[associatedWith].length > 0;
    });

    return associatedScripts;
  },

  getAssociationsList(associationsFor, associatedItems) {
    const hasItems = associatedItems.length > 0;
    const list = {
      schedules: null,
      triggers: null,
      notAssociated: null
    };

    if (hasItems) {
      list.schedules = (
        <div>
          Associated with Schedules: {this.getDialogList(associatedItems, 'label', associationsFor)}
        </div>
      );
      list.triggers = (
        <div>
          Associated with Triggers: {this.getDialogList(associatedItems, 'label', associationsFor)}
        </div>
      );
      list.notAssociated = (
        <div>
          Not associated: {this.getDialogList(associatedItems, 'label')}
        </div>
      );
    }

    return list[associationsFor];
  },

  initDialogs() {
    const checkedScripts = Store.getCheckedItems();
    const scriptsAssociatedWithTriggers = this.getAssociatedScripts('triggers');
    const scriptsAssociatedWithSchedules = this.getAssociatedScripts('schedules');
    const scriptsNotAssociated = _.difference(_.difference(checkedScripts, scriptsAssociatedWithSchedules),
      scriptsAssociatedWithTriggers);

    const deleteDialog = {
      dialog: Dialog.Delete,
      params: {
        key: 'deleteScriptDialog',
        ref: 'deleteScriptDialog',
        title: 'Delete a Script',
        handleConfirm: Actions.removeScripts,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        itemLabelName: 'label',
        groupName: 'Script'
      }
    };

    if (scriptsAssociatedWithSchedules.length > 0 || scriptsAssociatedWithTriggers.length > 0) {
      const associatedWithSchedulesList = this.getAssociationsList('schedules', scriptsAssociatedWithSchedules);
      const associatedWithTriggersList = this.getAssociationsList('triggers', scriptsAssociatedWithTriggers);
      const notAssociatedList = this.getAssociationsList('notAssociated', scriptsNotAssociated);

      deleteDialog.params.children = [
        `Some of checked Scripts are associated with Schedules or Triggers. Do you really want to delete
        ${Store.getDeleteItemsPhrase('Script')}?`,
        notAssociatedList,
        associatedWithSchedulesList,
        associatedWithTriggersList,
        <Loading
          type="linear"
          position="bottom"
          show={this.state.isLoading}
        />
      ];
    }

    return [deleteDialog];
  },

  renderHeader() {
    const { routes, items } = this.props;
    const checkedItems = Store.getNumberOfChecked();
    const currentRouteName = routes[routes.length - 1].name;

    if (items.length) {
      return (
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
          >
            Scripts
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              handleSelectAll={Actions.selectAll}
              handleUnselectAll={Actions.uncheckAll}
              itemsCount={items.length}
            >
              <Lists.MenuItem onTouchTap={() => this.showDialog('deleteScriptDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
      );
    }

    if (currentRouteName === 'snippets') {
      return (
        <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 30, color: Colors.grey600 }}>Scripts</div>
      );
    }

    return null;
  },

  renderItem(item) {
    return (
      <ListItem
        key={`scripts-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('deleteScriptDialog', item)}
      />
    );
  },

  render() {
    const { isLoading, titleVisible, items, emptyView, ...other } = this.props;

    return (
      <Lists.Container>
        {this.getDialogs()}
        {titleVisible && this.renderHeader()}
        <Loading show={isLoading}>
          <Lists.List
            {...other}
            key="scripts-list"
            items={items}
            renderItem={this.renderItem}
            emptyView={emptyView}
          />
        </Loading>
      </Lists.Container>
    );
  }
});

export default withRouter(ScriptsList);
