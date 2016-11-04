import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import _ from 'lodash';
import Helmet from 'react-helmet';

// Utils
import { DialogsMixin } from '../../mixins';
import Constants from '../../constants/Constants';

// Stores and Actions
import Actions from './DataObjectsActions';
import Store from './DataObjectsStore';

// Components
import { IconButton } from 'material-ui';
import { Container, Dialog, InnerToolbar, Loading } from '../../common/';

// Local components
import ReadOnlyTooltip from './ReadOnlyTooltip';
import DataObjectsTable from './DataObjectsTable';
import DataObjectSearchInput from './DataObjectSearchInput';

const DataObjects = React.createClass({
  displayName: 'DataObjects',

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    const { location } = this.props;

    Actions.fetch();

    if (location.state && location.state.showDialog) {
      Actions.showDialog();
    }
  },

  componentWillUpdate(nextProps, nextState) {
    this.hideDialogs(nextState.hideDialogs);
  },

  componentWillUnmount() {
    Actions.clearStore();
  },

  isClassProtected() {
    const { className } = this.props.params;

    return _.includes(Constants.PROTECTED_FROM_DELETE_CLASS_NAMES, className);
  },

  handleDelete() {
    const { classObj } = this.state;

    Actions.removeDataObjects(classObj.name, Store.getIDsFromTable());
  },

  handleRowSelection(selectedRows) {
    const { items } = this.state;

    const selectedRowsMap = {
      all: _.map(items, (item, index) => index),
      none: []
    };

    Actions.setSelectedRows(_.isString(selectedRows) ? selectedRowsMap[selectedRows] : selectedRows);
  },

  handleMoreRows() {
    const { nextParams, users } = this.state;

    Actions.subFetchDataObjects(nextParams, users);
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
        items: Store.getCheckedItems(),
        groupName: 'Data Object',
        children: `Do you really want to delete ${Store.getSelectedRowsLength()} Data Object(s)?`,
        isLoading
      }
    }];
  },

  renderTable() {
    const { hasNextPage, isLoading, items, selectedRows, classObj, users } = this.state;

    return (
      <DataObjectsTable
        isLoading={isLoading}
        items={items}
        users={users}
        hasNextPage={hasNextPage}
        selectedRows={selectedRows}
        classObject={classObj}
        handleRowSelection={this.handleRowSelection}
        handleMoreRows={this.handleMoreRows}
      />
    );
  },

  render() {
    const { className } = this.props.params;
    const { isLoading, selectedRows } = this.state;
    const title = `Data Class: ${className}`;
    let selectedMessageText = '';

    if (_.isArray(selectedRows) && !_.isEmpty(selectedRows)) {
      selectedMessageText = `selected: ${selectedRows.length}`;
    }

    return (
      <div>
        <Helmet title={title} />
        {this.getDialogs()}

        <InnerToolbar
          title={`${title} ${selectedMessageText}`}
        >
          <DataObjectSearchInput />
          <IconButton
            data-e2e="data-object-add-button"
            iconClassName="synicon-plus"
            tooltip={this.isClassProtected() ? <ReadOnlyTooltip className={className} /> : 'Add Data Objects'}
            disabled={this.isClassProtected()}
            onClick={Actions.showDialog}
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
            onTouchTap={Actions.fetch}
          />
        </InnerToolbar>
        <Container>
          <Loading show={isLoading}>
            {this.renderTable()}
          </Loading>
        </Container>
      </div>
    );
  }
});

export default withRouter(DataObjects);
