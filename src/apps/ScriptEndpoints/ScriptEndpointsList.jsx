import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

// Utils
import { DialogsMixin } from '../../mixins';

import Actions from './ScriptEndpointsActions';
import Store from './ScriptEndpointsStore';
import ScriptsStore from '../Scripts/ScriptsStore';

// Components
import ListItem from './ScriptEndpointsListItem';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, Dialog, Lists, EmptyView } from '../../common/';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ScriptEndpointsList',

  mixins: [
    Reflux.connect(ScriptsStore, 'scripts'),
    DialogsMixin
  ],


  getDefaultProps() {
    return {
      emptyItemContent: 'Add a Script Endpoint',
      emptyItemHandleClick: Actions.showDialog,
      getCheckedItems: Store.getCheckedItems,
      checkItem: Actions.checkItem,
      handleSelectAll: Actions.selectAll,
      handleUnselectAll: Actions.uncheckAll
    };
  },

  componentWillUpdate(nextProps) {
    console.info('Admins::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const { isLoading, getCheckedItems } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeScriptEndpointDialog',
        ref: 'removeScriptEndpointDialog',
        title: 'Delete a Script Endpoint',
        handleConfirm: Actions.removeScriptEndpoints,
        items: getCheckedItems(),
        groupName: 'Script Endpoint',
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
        key={`script-endpoints-list-item-${item.name}`}
        onIconClick={checkItem}
        item={item}
        scriptLabel={scriptObj ? scriptObj.label : ''}
        showDeleteDialog={() => this.showDialog('removeScriptEndpointDialog', item)}
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
          iconClassName="synicon-socket-script-endpoint"
          iconColor={Colors.red400}
          title="Script Endpoint"
          urlLabel="Script Endpoint"
          description="Create script endpoint which is a URLs that run your custom code in the cloud."
          docsUrl="http://docs.syncano.io/docs/endpoints-scripts"
          buttonLabel="Add Script Endpoint"
          handleClick={Actions.showDialog}
        />
      );
    }

    return (
      <Lists.Container style={style}>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={handleTitleClick}
          >
            Script Endpoints
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"
          >
            Description
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"
          >
            Script
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"
          >
            Traces
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="KEY"
            className="col-flex-1"
          >
            Public
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={getCheckedItems().length}
              handleSelectAll={handleSelectAll}
              handleUnselectAll={handleUnselectAll}
            >
              <Lists.MenuItem onTouchTap={() => this.showDialog('removeScriptEndpointDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...other}
          isLoading={isLoading}
          items={items}
          key="script-endpoints-list"
          renderItem={this.renderItem}
        />
      </Lists.Container>
    );
  }
});
