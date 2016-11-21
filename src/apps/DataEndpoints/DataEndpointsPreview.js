import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';
import _ from 'lodash';
import { withRouter } from 'react-router';

import { DialogsMixin } from '../../mixins';
import Constants from '../../constants/Constants';

import Actions from './DataEndpointsPreviewActions';
import Store from './DataEndpointsPreviewStore';

import { IconButton } from 'material-ui';
import { Container, Dialog, InnerToolbar, Loading, ToolbarTitle } from '../../common';
import DataObjectsTable from '../DataObjects/DataObjectsTable';
import ReadOnlyTooltip from '../DataObjects/ReadOnlyTooltip';

const DataEndpointsPreview = React.createClass({
  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  getInitialState() {
    return {
      selectedRows: []
    };
  },

  componentDidMount() {
    const { dataEndpointName } = this.props.params;

    Actions.setDataEndpointName(dataEndpointName);
    Actions.fetch();
  },

  componentWillUpdate(nextProps, nextState) {
    this.hideDialogs(nextState.hideDialogs);
  },

  componentWillUnmount() {
    Actions.clearStore();
  },

  getStyles() {
    return {
      iconButtons: {
        fontSize: 25,
        marginTop: 5
      }
    };
  },

  isClassProtected() {
    const { classObject } = this.state;

    if (classObject) {
      return _.includes(Constants.PROTECTED_FROM_DELETE_CLASS_NAMES, classObject.name);
    }

    return classObject;
  },

  handleBackClick() {
    const { router, params } = this.props;

    router.push(`/instances/${params.instanceName}/data-endpoints/`);
  },

  handleRowSelection(selectedRows) {
    const { items } = this.state;

    const selectedRowsMap = {
      all: _.map(items, (item, index) => index),
      none: []
    };

    this.setState({
      selectedRows: _.isString(selectedRows) ? selectedRowsMap[selectedRows] : selectedRows
    });
  },

  handleMoreRows() {
    const { nextLink } = this.state;

    Actions.fetchNextDataPage(nextLink);
  },

  handleDelete() {
    const { classObject, items, selectedRows } = this.state;
    const selectedDataObectsIds = _.map(selectedRows, (rowId) => items[rowId].id);

    Actions.removeDataObjects(classObject.name, selectedDataObectsIds);
  },

  initDialogs() {
    const { selectedRows, isLoading } = this.state;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteDataObjectDialog',
        ref: 'deleteDataObjectDialog',
        title: 'Delete a Data Object',
        handleConfirm: this.handleDelete,
        items: Store.getCheckedItems(),
        groupName: 'Data Object',
        children: `Do you really want to delete ${selectedRows.length} Data Object(s)?`,
        isLoading
      }
    }];
  },

  render() {
    const { isLoading, classObject, selectedRows, currentPage, hasNextPage, items } = this.state;
    const { dataEndpointName } = this.props.params;
    const styles = this.getStyles();

    return (
      <div>
        {this.getDialogs()}
        <Helmet title={`Data Endpoint ${dataEndpointName} Preview`} />
        <InnerToolbar
          backFallback={this.handleBackClick}
          backButtonTooltip="Go back to Data Endpoints list"
        >
          <ToolbarTitle title={`Response preview for Data Endpoint ${dataEndpointName}`} />
          <IconButton
            data-e2e="data-object-delete-button"
            style={styles.iconButtons}
            iconClassName="synicon-delete"
            tooltip={this.isClassProtected() ? <ReadOnlyTooltip className={classObject.name} /> : 'Delete Data Objects'}
            disabled={(selectedRows && !selectedRows.length) || this.isClassProtected()}
            onTouchTap={() => this.showDialog('deleteDataObjectDialog')}
          />
          <IconButton
            style={styles.iconButtons}
            iconClassName="synicon-refresh"
            tooltip="Reload Data Objects"
            onTouchTap={() => Actions.fetchData(currentPage)}
          />
        </InnerToolbar>
        <Container>
          <Loading show={isLoading}>
            <DataObjectsTable
              withEditDialog={false}
              isLoading={isLoading}
              items={items}
              hasNextPage={hasNextPage}
              selectedRows={selectedRows}
              classObject={classObject}
              handleRowSelection={this.handleRowSelection}
              handleMoreRows={this.handleMoreRows}
            />
          </Loading>
        </Container>
      </div>
    );
  }
});

export default withRouter(DataEndpointsPreview);
