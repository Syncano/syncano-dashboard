import React, { Component } from 'react';
import _ from 'lodash';
import localStorage from 'local-storage-fallback';

import DataObjectsTableInitialColumns from './DataObjectsTableInitialColumns';

import { Table, TableBody, TableHeader, TableRow, TableRowColumn, TableHeaderColumn } from 'material-ui';
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
      columns: this.getInitialColumns()
    };
  }

  getStyles = () => ({
    tableWrapper: {
      minHeight: 120
    },
    tableHeaderColumn: {
      width: 20,
      paddingLeft: 6,
      paddingRight: 30,
      whiteSpace: 'normal',
      wordWrap: 'normal'
    },
    tableBody: {
      overflowX: 'visible',
      overflowY: 'initial'
    },
    tableRow: {
      cursor: 'pointer'
    }
  });

  getSchemaColumns = (schema) => (
    _.map(schema, (item) => ({
      id: item.name,
      name: item.name,
      checked: true,
      sortable: item.order_index
    }))
  )

  getInitialColumns() {
    let columns = DataObjectsTableInitialColumns;
    const { classObject } = this.props;
    const { className } = classObject;
    const settings = localStorage.getItem(`dataobjects_checkedcolumns_${className}`);
    const schemaColumns = this.getSchemaColumns(classObject.schema);

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
      if (!column.checked) {
        return null;
      }

      return column.id;
    });
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

    const columnsComponents = _.map(columns, (item, index) => {
      if (!item.checked) {
        return null;
      }

      const handleTableHeaderSortableColumnClick = () => {
        handleSortingSelection(item.id);
      };

      return (
        <TableHeaderSortableColumn
          key={`header-column-${index}`}
          style={{
            width: item.width || 100,
            whiteSpace: 'normal',
            wordWrap: 'normal'
          }}
          id={item.id}
          sortable={item.sortable}
          currentOrderBy={currentOrderBy}
          clickHandler={handleTableHeaderSortableColumnClick}
        >
          {item.id}
        </TableHeaderSortableColumn>
      );
    });

    return (
      <TableHeader key="header">
        <TableRow key="header-row">
          <TableHeaderColumn
            key="header-column-check-menu"
            tooltip="Manage columns"
            style={styles.tableHeaderColumn}
          >
            <ColumnsFilterMenu
              columns={columns}
              checkToggleColumn={(columnId) => this.checkToggleColumn(columnId)}
            />
          </TableHeaderColumn>
          {columnsComponents}
        </TableRow>
      </TableHeader>
    );
  }

  renderTableData() {
    const styles = this.getStyles();
    const { columns } = this.state;
    const { users, items, selectedRows } = this.props;

    const tableData = _.map(items, (item, index) => {
      const selected = (selectedRows || []).indexOf(index) > -1;
      const columnsComponents = _.map(columns, (column, idx) => {
        if (!column.checked) {
          return null;
        }

        return (
          <TableRowColumn
            key={`${column.id}-${idx}`}
            style={{ width: column.width || 100 }}
            data-e2e={`${column.id}-data-object-column`}
          >
            <DataObjectsTableCell
              item={item}
              columnId={column.id}
              users={users}
            />
          </TableRowColumn>
        );
      });

      return (
        <TableRow
          key={`row-${item.id}`}
          selected={selected}
          style={styles.tableRow}
          data-e2e={`${index}-data-object-row`}
        >
          <TableHeaderColumn
            key={`header-column-check-menu-${item.id}`}
            style={styles.tableHeaderColumn}
          />
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
    const { handleRowSelection, withEditDialog, onCellClick } = this.props;

    return (
      <div data-e2e="data-objects-table">
        <Table
          multiSelectable={true}
          showRowHover={true}
          wrapperStyle={styles.tableWrapper}
          bodyStyle={styles.tableBody}
          onRowSelection={handleRowSelection}
          onCellClick={withEditDialog && onCellClick}
        >
          {this.renderTableHeader()}
          {this.renderTableBody()}
        </Table>
      </div>
    );
  }
}

export default DataObjectsTable;
