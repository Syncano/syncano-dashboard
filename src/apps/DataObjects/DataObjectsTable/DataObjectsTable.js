import React, { Component } from 'react';
import _ from 'lodash';
import localStorage from 'local-storage-fallback';

import { Table, TableBody, TableHeader, TableRow, TableRowColumn, TableHeaderColumn } from 'material-ui';
import { TableHeaderSortableColumn } from '../../../common/';
import ColumnsFilterMenu from './ColumnsFilterMenu';
import DataObjectsTableCell from './DataObjectsTableCell';

class DataObjectsTable extends Component {
  static defaultProps = {
    withEditDialog: true
  }

  constructor(props) {
    super(props);

    this.state = {
      columns: this.getInitialColumns()
    };
  }

  getStyles = () => ({
    tableBody: {
      // replace default MUI styles
      overflow: null
    },
    tableHeaderFilterColumn: {
      width: 58,
      paddingLeft: 10,
      paddingRight: 0,
      whiteSpace: 'nowrap'
    },
    tableBodyRow: {
      cursor: 'pointer'
    }
  })

  getSchemaColumns = (schema) => (
    _.map(schema, (item) => ({
      id: item.name,
      name: item.name,
      checked: true,
      sortable: item.order_index
    }))
  )

  getInitialColumns() {
    const { classObject, initialColumns } = this.props;
    const { className } = classObject;
    const settings = localStorage.getItem(`dataobjects_checkedcolumns_${className}`);
    const schemaColumns = this.getSchemaColumns(classObject.schema);
    const columns = [...initialColumns, ...schemaColumns];

    if (className === 'user_profile') {
      columns.unshift({
        id: 'username',
        width: 100,
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

    const checkedColumns = _.filter(columns, (column) => column.checked);
    const checkedColumnsIDs = _.map(checkedColumns, (column) => column.id);

    return checkedColumnsIDs;
  }

  updateLocalStorage() {
    const { className } = this.props.classObject;
    const checkedColumnsIDs = this.getCheckedColumnsIDs();

    localStorage.setItem(`dataobjects_checkedcolumns_${className}`, JSON.stringify(checkedColumnsIDs));
  }

  checkToggleColumn = (columnId) => {
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
    const { currentSortingField, handleSortingFieldSelection } = this.props;
    const checkedColumns = _.filter(columns, (column) => column.checked);

    const columnsComponents = _.map(checkedColumns, (item) => (
      <TableHeaderSortableColumn
        key={`table-header-column-${item.id}`}
        style={{
          width: item.width || 120,
          padding: '0 10px'
        }}
        id={item.id}
        sortable={item.sortable}
        currentSortingField={currentSortingField}
        onLabelClick={handleSortingFieldSelection}
      >
        {item.id}
      </TableHeaderSortableColumn>
    ));

    return (
      <TableHeader key="header">
        <TableRow key="header-row">
          <TableHeaderColumn
            key="header-column-check-menu"
            tooltip="Manage columns"
            style={styles.tableHeaderFilterColumn}
          >
            <ColumnsFilterMenu
              columns={columns}
              checkToggleColumn={this.checkToggleColumn}
            />
          </TableHeaderColumn>
          {columnsComponents}
        </TableRow>
      </TableHeader>
    );
  }

  renderTableData() {
    const styles = this.getStyles();
    const { users, items, selectedItemsIDs } = this.props;
    const { columns } = this.state;
    const checkedColumns = _.filter(columns, (column) => column.checked);

    const tableData = _.map(items, (item, index) => {
      const selected = _.includes(selectedItemsIDs, item.id);
      const columnsComponents = _.map(checkedColumns, (column) => (
        <TableRowColumn
          key={`table-row-column-${column.id}`}
          style={{
            width: column.width || 120,
            padding: '0 10px'
          }}
          data-e2e={`${column.id}-data-object-column`}
        >
          <DataObjectsTableCell
            item={item}
            columnId={column.id}
            users={users}
          />
        </TableRowColumn>
      ));

      return (
        <TableRow
          key={`row-${item.id}`}
          selected={selected}
          style={styles.tableBodyRow}
          data-e2e={`${index}-data-object-row`}
        >
          <TableHeaderColumn
            key={`header-column-check-menu-${item.id}`}
            style={styles.tableHeaderFilterColumn}
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
