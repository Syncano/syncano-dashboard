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
import { Container, Dialog, InnerToolbar, Loading, Pagination } from '../../common/';

import DataObjectSearchForm from './DataObjectSearchForm';
import DataObjectsTable from './DataObjectsTable';
import ReadOnlyTooltip from './ReadOnlyTooltip';

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
      },
      iconStyle: {
        color: '#fff',
        opacity: 0.9
      }
    };
  },

  getSelectedItemsIDs(selectedRows) {
    const { items, selectedItemsIDs } = this.state;

    const visibleItemsIDs = _.map(items, (item) => item.id);

    if (selectedRows === 'all') {
      return _.union(selectedItemsIDs, visibleItemsIDs);
    }

    if (selectedRows === 'none') {
      return _.filter(selectedItemsIDs, (id) => !_.includes(visibleItemsIDs, id));
    }

    const invisibleSelectedItemsIDs = _.filter(selectedItemsIDs, (id) => !_.includes(visibleItemsIDs, id));
    const visibleSelectedItemsIDs = _.map(selectedRows, (index) => items[index].id);
    const allSelectedItemsIDs = [...invisibleSelectedItemsIDs, ...visibleSelectedItemsIDs];

    return allSelectedItemsIDs;
  },

  getTitleSelectedItemsText() {
    const { selectedItemsIDs } = this.state;

    if (_.isArray(selectedItemsIDs) && !_.isEmpty(selectedItemsIDs)) {
      return `(selected: ${selectedItemsIDs.length})`;
    }

    return '';
  },

  isClassProtected() {
    const { className } = this.props.params;

    return _.includes(Constants.PROTECTED_FROM_DELETE_CLASS_NAMES, className);
  },

  handleDelete() {
    const { classObj, selectedItemsIDs } = this.state;

    DataObjectsActions.removeDataObjects(classObj.name, selectedItemsIDs);
  },

  handleRowSelection(selectedRows) {
    const selectedItemsIDs = this.getSelectedItemsIDs(selectedRows);

    DataObjectsActions.setSelectedItemsIDs(selectedItemsIDs);
  },

  handleTableCellClick(cellNumber, columnNumber) {
    if (columnNumber > -1) {
      DataObjectsStore.getSelectedRowObj(cellNumber);
    }
  },

  handleBackClick() {
    const { router, params } = this.props;

    router.push(`/instances/${params.instanceName}/classes/`);
  },

  initDialogs() {
    const { isLoading } = this.props;
    const { selectedItemsIDs } = this.state;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteDataObjectDialog',
        ref: 'deleteDataObjectDialog',
        title: 'Delete a Data Object',
        handleConfirm: this.handleDelete,
        groupName: 'Data Object',
        items: selectedItemsIDs,
        isLoading
      }
    }];
  },

  renderTable() {
    const {
      isLoading,
      items,
      users,
      selectedItemsIDs,
      classObj,
      currentSortingField,
      pageCount,
      currentPage
    } = this.state;

    return (
      <Loading show={isLoading}>
        <DataObjectsTable
          items={items}
          users={users}
          selectedItemsIDs={selectedItemsIDs}
          initialColumns={DataObjectsTableInitialColumns}
          classObject={classObj}
          handleRowSelection={this.handleRowSelection}
          handleSortingFieldSelection={DataObjectsActions.selectSortingField}
          currentSortingField={currentSortingField}
          onCellClick={this.handleTableCellClick}
        />
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          onPageClick={DataObjectsActions.goToPage}
        />
      </Loading>
    );
  },

  render() {
    const styles = this.getStyles();
    const { className } = this.props.params;
    const { classObj, selectedItemsIDs } = this.state;
    const title = `Data Class: ${className}`;
    const titleSelectedItemsText = this.getTitleSelectedItemsText();

    return (
      <div>
        <Helmet title={title} />
        {this.getDialogs()}

        <InnerToolbar
          title={`${title} ${titleSelectedItemsText}`}
          backButton={true}
          forceBackFallback={true}
          backFallback={this.handleBackClick}
          backButtonTooltip="Go Back to Classes"
        >
          <div style={styles.buttonsWrapper}>
            <DataObjectSearchForm classObj={classObj} />
            <IconButton
              data-e2e="data-object-add-button"
              iconClassName="synicon-plus"
              tooltip={this.isClassProtected() ? <ReadOnlyTooltip className={className} /> : 'Add Data Object'}
              disabled={this.isClassProtected()}
              onClick={DataObjectsActions.showDialog}
              iconStyle={styles.iconStyle}
            />
            <IconButton
              data-e2e="data-object-delete-button"
              iconClassName="synicon-delete"
              tooltip={this.isClassProtected() ? <ReadOnlyTooltip className={className} /> : 'Delete Data Objects'}
              disabled={(selectedItemsIDs && !selectedItemsIDs.length) || this.isClassProtected()}
              onTouchTap={() => this.showDialog('deleteDataObjectDialog')}
              iconStyle={styles.iconStyle}
            />
            <IconButton
              iconClassName="synicon-refresh"
              tooltip="Reload Data Objects"
              onTouchTap={DataObjectsActions.fetch}
              iconStyle={styles.iconStyle}
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
