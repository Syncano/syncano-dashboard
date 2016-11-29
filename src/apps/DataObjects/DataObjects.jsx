import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import _ from 'lodash';
import Helmet from 'react-helmet';

import { DialogsMixin } from '../../mixins';
import Constants from '../../constants/Constants';
import DataObjectsTableInitialColumns from './DataObjectsTableInitialColumns';

import DataObjectsActions from './DataObjectsActions';
import DataObjectsStore from './DataObjectsStore';

import { IconButton } from 'material-ui';
import { Container, DataObjectsTable, Dialog, InnerToolbar, Loading, Pagination } from '../../common/';

import ReadOnlyTooltip from './ReadOnlyTooltip';
import DataObjectSearchInput from './DataObjectSearchInput';

const DataObjects = React.createClass({
  mixins: [
    Reflux.connect(DataObjectsStore),
    DialogsMixin
  ],

  componentDidMount() {
    const { location } = this.props;

    DataObjectsActions.fetch();

    if (location.state && location.state.showDialog) {
      DataObjectsActions.showDialog();
    }
  },

  componentWillUpdate(nextProps, nextState) {
    this.hideDialogs(nextState.hideDialogs);
  },

  componentWillUnmount() {
    DataObjectsActions.clearStore();
  },

  getStyles() {
    return {
      buttonsWrapper: {
        display: 'flex',
        alignItems: 'center'
      }
    };
  },

  isClassProtected() {
    const { className } = this.props.params;

    return _.includes(Constants.PROTECTED_FROM_DELETE_CLASS_NAMES, className);
  },

  handleDelete() {
    const { classObj } = this.state;

    DataObjectsActions.removeDataObjects(classObj.name, DataObjectsStore.getIDsFromTable());
  },

  handleRowSelection(selectedRows) {
    const { items } = this.state;

    const selectedRowsMap = {
      all: _.map(items, (item, index) => index),
      none: []
    };

    DataObjectsActions.setSelectedRows(_.isString(selectedRows) ? selectedRowsMap[selectedRows] : selectedRows);
  },

  handleTableCellClick(cellNumber, columnNumber) {
    if (columnNumber > -1) {
      DataObjectsStore.getSelectedRowObj(cellNumber);
    }
  },

  initDialogs() {
    const { isLoading } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteDataObjectDialog',
        ref: 'deleteDataObjectDialog',
        title: 'Delete a Data Object',
        handleConfirm: this.handleDelete,
        items: DataObjectsStore.getCheckedItems(),
        groupName: 'Data Object',
        children: `Do you really want to delete ${DataObjectsStore.getSelectedRowsLength()} Data Object(s)?`,
        isLoading
      }
    }];
  },

  renderTable() {
    const { isLoading, items, users, selectedRows, classObj, currentOrderBy, pagesCount, currentPage } = this.state;

    return (
      <Loading show={isLoading}>
        <DataObjectsTable
          items={items}
          users={users}
          selectedRows={selectedRows}
          initialColumns={DataObjectsTableInitialColumns}
          classObject={classObj}
          handleRowSelection={this.handleRowSelection}
          handleSortingSelection={DataObjectsActions.selectSorting}
          currentOrderBy={currentOrderBy}
          onCellClick={this.handleTableCellClick}
        />
        <Pagination
          pageNum={pagesCount}
          currentPage={currentPage}
          onPageClick={DataObjectsActions.goToPage}
        />
      </Loading>
    );
  },

  render() {
    const styles = this.getStyles();
    const { className } = this.props.params;
    const { selectedRows } = this.state;
    const title = `Data Class: ${className}`;
    let selectedMessageText = '';

    if (_.isArray(selectedRows) && !_.isEmpty(selectedRows)) {
      selectedMessageText = `selected: ${selectedRows.length}`;
    }

    return (
      <div>
        <Helmet title={title} />
        {this.getDialogs()}

        <InnerToolbar title={`${title} ${selectedMessageText}`}>
          <div style={styles.buttonsWrapper}>
            <DataObjectSearchInput />
            <IconButton
              data-e2e="data-object-add-button"
              iconClassName="synicon-plus"
              tooltip={this.isClassProtected() ? <ReadOnlyTooltip className={className} /> : 'Add Data Objects'}
              disabled={this.isClassProtected()}
              onClick={DataObjectsActions.showDialog}
            />
            <IconButton
              data-e2e="data-object-delete-button"
              iconClassName="synicon-delete"
              tooltip={this.isClassProtected() ? <ReadOnlyTooltip className={className} /> : 'Delete Data Objects'}
              disabled={(selectedRows && !selectedRows.length) || this.isClassProtected()}
              onTouchTap={() => this.showDialog('deleteDataObjectDialog')}
            />
            <IconButton
              iconClassName="synicon-refresh"
              tooltip="Reload Data Objects"
              onTouchTap={DataObjectsActions.fetch}
            />
          </div>
        </InnerToolbar>

        <Container>
          {this.renderTable()}
        </Container>
      </div>
    );
  }
});

export default withRouter(DataObjects);
