import React from 'react';
import { withRouter } from 'react-router';

// Utils
import { DialogsMixin } from '../../mixins';
import { colors as Colors } from 'material-ui/styles';

import Actions from './TemplatesActions';
import Store from './TemplatesStore';

// Components
import ListItem from './TemplatesListItem';
import TemplatesEmptyView from './TemplatesEmptyView';
import { ColumnList, Dialog, Lists, Loading } from '../../common/';

const Column = ColumnList.Column;

const TemplatesList = React.createClass({
  displayName: 'TemplatesList',

  mixins: [DialogsMixin],

  getDefaultProps() {
    return {
      titleVisible: true,
      emptyView: <TemplatesEmptyView />
    };
  },

  componentWillUpdate(nextProps) {
    console.info('TemplatesList::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeTemplateDialog',
        ref: 'removeTemplateDialog',
        title: 'Delete a Template',
        handleConfirm: Actions.removeTemplates,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        groupName: 'Template'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`template-list-item-${item.name}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeTemplateDialog', item)}
      />
    );
  },

  renderHeader() {
    const { handleTitleClick, routes, items } = this.props;
    const checkedItems = Store.getNumberOfChecked();
    const currentRouteName = routes[routes.length - 1].name;

    if (items.length) {
      return (
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={handleTitleClick}
          >
            Templates
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"
          >
            Content type
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              handleSelectAll={Actions.selectAll}
              handleUnselectAll={Actions.uncheckAll}
            >
              <Lists.MenuItem onTouchTap={() => this.showDialog('removeTemplateDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
      );
    }

    if (currentRouteName === 'snippets') {
      return (
        <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 30, color: Colors.grey600 }}>Templates</div>
      );
    }

    return null;
  },

  render() {
    const { isLoading, items, emptyView, titleVisible, ...other } = this.props;

    return (
      <Lists.Container>
        {this.getDialogs()}
        {titleVisible && this.renderHeader()}
        <Loading show={isLoading}>
          <Lists.List
            {...other}
            items={items}
            key="templates-list"
            renderItem={this.renderItem}
            emptyView={emptyView}
          />
        </Loading>
      </Lists.Container>
    );
  }
});

export default withRouter(TemplatesList);
