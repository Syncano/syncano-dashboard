import React, { Component } from 'react';
import _ from 'lodash';
import localStorage from 'local-storage-fallback';

import DataObjectsTableInitialColumns from './DataObjectsTableInitialColumns';

import DataObjectsStore from '../../apps/DataObjects/DataObjectsStore';

import { Table, TableBody, TableHeader, TableRow, TableRowColumn } from 'material-ui';
import { TableHeaderSortableColumn } from '../';
import ColumnsFilterMenu from './ColumnsFilterMenu';
import DataObjectsTableCell from './DataObjectsTableCell';

class DataObjectsTable extends Component {
  static defaultProps = {
    withEditDialog: true
  };

  constructor(props) {
    super(props);

    this.state = {
      columns: this.getColumns()
    };
  }

  getStyles = () => ({
    tableWrapper: {
      minHeight: 120
    },
    tableHeaderSortableColumn: {
      width: 20,
      paddingLeft: 6,
      paddingRight: 30,
      whiteSpace: 'normal',
      wordWrap: 'normal'
    },
    tableBody: {
      overflowX: 'visible',
      overflowY: 'initial'
    }
  });

  getColumns() {
    let columns = DataObjectsTableInitialColumns;

    const { classObject } = this.props;
    const className = classObject.className;
    const settings = localStorage.getItem(`dataobjects_checkedcolumns_${className}`);

    const schemaColumns = _.map(classObject.schema, (item) => ({
      id: item.name,
      name: item.name,
      sortable: item.order_index,
      checked: true
    }));

    columns = [...columns, ...schemaColumns];

    if (className === 'user_profile') {
      columns.unshift({
        id: 'username',
        width: 120,
        checked: true
      });
    }

    if (settings) {
      const checkedColumns = JSON.parse(settings);

      _.forEach(columns, (column) => {
        column.checked = checkedColumns.indexOf(column.id) !== -1;
      });
    }

    return columns;
  }

  getCheckedColumnsIDs() {
    const { columns } = this.state;

    return _.map(columns, (column) => {
      if (column.checked) {
        return column.id;
      }

      return null;
    });
  }

  showDataObjectEditDialog = (cellNumber, columnNumber) => {
    if (columnNumber > -1) {
      DataObjectsStore.getSelectedRowObj(cellNumber);
    }
  }

  updateLocalStorage() {
    const { className } = this.props.classObject;

    localStorage.setItem(`dataobjects_checkedcolumns_${className}`, JSON.stringify(this.getCheckedColumnsIDs()));
  }

  checkToggleColumn(columnId) {
    const { columns } = this.state;

    columns.forEach((item) => {
      if (columnId === item.id) {
        item.checked = !item.checked;
      }
    });
    this.updateLocalStorage();
    this.setState({ columns });
  }

  renderTableHeader() {
    const styles = this.getStyles();
    const { columns } = this.state;
    const { currentOrderBy, handleSortingSelection } = this.props;
    const columnCheckMenu = (
      <TableHeaderSortableColumn
        key="header-column-check-menu"
        style={styles.tableHeaderSortableColumn}
        tooltip="Manage columns"
      >
        <ColumnsFilterMenu
          columns={columns}
          checkToggleColumn={(columnId) => this.checkToggleColumn(columnId)}
        />
      </TableHeaderSortableColumn>
    );

    const columnsComponents = _.map(columns, (item, index) => {
      if (item.checked) {
        return (
          <TableHeaderSortableColumn
            key={`header-column-${index}`}
            style={{
              width: item.width ? item.width : 100,
              whiteSpace: 'normal',
              wordWrap: 'normal'
            }}
            id={item.id}
            sortable={item.sortable}
            currentOrderBy={currentOrderBy}
            clickHandler={() => handleSortingSelection(item.id)}
          >
            {item.id}
          </TableHeaderSortableColumn>
        );
      }

      return null;
    });

    columnsComponents.unshift(columnCheckMenu);

    return (
      <TableHeader key="header">
        <TableRow key="header-row">
          {columnsComponents}
        </TableRow>
      </TableHeader>
    );
  }

  renderTableData() {
    const styles = this.getStyles();
    const { columns } = this.state;
    const { users, items, selectedRows, currentOrderBy, handleSortingSelection } = this.props;

    const tableData = _.map(items, (item, index) => {
      const selected = (selectedRows || []).indexOf(index) > -1;
      const columnCheckMenu = (
        <TableHeaderSortableColumn
          key={`header-column-check-menu-${item.id}`}
          style={styles.tableHeaderSortableColumn}
          id={item.id}
          sortable={item.sortable}
          currentOrderBy={currentOrderBy}
          clickHandler={() => handleSortingSelection(item.id)}
        />
      );
      const columnsComponents = _.map(columns, (column, idx) => {
        if (!column.checked) {
          return false;
        }

        return (
          <TableRowColumn
            key={`${column.id}-${idx}`}
            style={{ width: column.width ? column.width : 100 }}
            data-e2e={`${column.id}-data-object-column`}
          >
            <DataObjectsTableCell
              column={column}
              users={users}
              item={item}
            />
          </TableRowColumn>
        );
      });

      columnsComponents.unshift(columnCheckMenu);

      return (
        <TableRow
          key={`row-${item.id}`}
          selected={selected}
          style={{ cursor: 'pointer' }}
          data-e2e={`${index}-data-object-row`}
        >
          {columnsComponents}
        </TableRow>
      );
    });

    return tableData;
  }

  renderTableBody() {
    return (
      <TableBody
        className="mui-table-body"
        deselectOnClickaway={false}
        showRowHover={true}
        stripedRows={false}
      >
        {this.renderTableData()}
      </TableBody>
    );
  }

  render() {
    const styles = this.getStyles();
    const { withEditDialog, handleRowSelection } = this.props;

    return (
      <div data-e2e="data-objects-table">
        <Table
          multiSelectable={true}
          showRowHover={true}
          wrapperStyle={styles.tableWrapper}
          bodyStyle={styles.tableBody}
          onRowSelection={handleRowSelection}
          onCellClick={withEditDialog && this.showDataObjectEditDialog}
        >
          {this.renderTableHeader()}
          {this.renderTableBody()}
        </Table>
      </div>
    );
  }
}

export default DataObjectsTable;
