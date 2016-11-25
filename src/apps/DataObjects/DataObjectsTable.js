import React, { Component } from 'react';
import _ from 'lodash';
import Moment from 'moment';
import localStorage from 'local-storage-fallback';

import DataObjectsStore from './DataObjectsStore';

import ColumnsFilterMenu from './ColumnsFilterMenu';
import { Table, TableBody, TableRow, TableRowColumn, FontIcon, TableHeader } from 'material-ui';
import { TableHeaderColumn } from '../../common';

class DataObjectsTable extends Component {
  static defaultProps = {
    withEditDialog: true
  };

  constructor(props) {
    super(props);

    let columns = [
      {
        id: 'id',
        sortable: true,
        width: 90,
        checked: true
      },
      {
        id: 'revision',
        width: 20,
        checked: true
      },
      {
        id: 'owner',
        width: 90,
        checked: false
      },
      {
        id: 'group',
        width: 90,
        checked: false
      },
      {
        id: 'owner_permissions',
        width: 90,
        checked: false
      },
      {
        id: 'group_permissions',
        width: 90,
        checked: false
      },
      {
        id: 'other_permissions',
        width: 90,
        checked: false
      },
      {
        id: 'channel',
        width: 90,
        checked: false
      },
      {
        id: 'channel_room',
        width: 90,
        checked: false
      },
      {
        id: 'created_at',
        sortable: true,
        width: 120,
        checked: true
      },
      {
        id: 'updated_at',
        sortable: true,
        width: 120,
        checked: true
      }
    ];

    const { classObject } = this.props;
    const className = classObject.className;
    const settings = localStorage.getItem(`dataobjects_checkedcolumns_${className}`);

    // Update columns from Class
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

    this.state = { columns };
  }

  getColumnRenderer(column) {
    return this.columnsRenderers()[column];
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

  handleFileOnClick = (event, value) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(value, '_blank');
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

  columnsRenderers() {
    return {
      created_at: this.renderColumnDate,
      updated_at: this.renderColumnDate
    };
  }

  // Columns renderers
  renderColumnDate = (value) => {
    if (!value) {
      return null;
    }

    return (
      <div title={`${Moment(value).format('DD/MM/YYYY')} ${Moment(value).format('LTS')}`}>
        {Moment(value).format('DD/MM/YYYY')}
      </div>
    );
  }

  renderReference = (obj) => (
    <div>{`${obj.target}: ${obj.value}`}</div>
  )

  renderFile(obj) {
    return (
      <div onClick={(event) => this.handleFileOnClick(event, obj.value)}>
        <FontIcon className="synicon-download" />
      </div>
    );
  }

  // Header
  renderTableHeader() {
    const { columns } = this.state;
    const columnCheckMenu = (
      <TableHeaderColumn
        key="header-column-check-menu"
        style={{
          paddingLeft: 6,
          paddingRight: 30,
          width: 20,
          whiteSpace: 'normal',
          wordWrap: 'normal'
        }}
        tooltip="Manage columns"
      >
        <ColumnsFilterMenu
          columns={columns}
          checkToggleColumn={(columnId) => this.checkToggleColumn(columnId)}
        />
      </TableHeaderColumn>
    );

    // Initial columns
    const columnsComponents = _.map(columns, (item, index) => {
      if (item.checked) {
        return (
          <TableHeaderColumn
            key={`header-column-${index}`}
            style={{
              width: item.width ? item.width : 100,
              whiteSpace: 'normal',
              wordWrap: 'normal'
            }}
            id={item.id}
            sortable={item.sortable}
            currentOrderBy={this.props.currentOrderBy}
            clickHandler={() => this.props.handleSortingSelection(item.id)}
          >
            {item.id}
          </TableHeaderColumn>
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

  // Table Body
  renderTableData(items, selectedRows) {
    const { columns } = this.state;
    const { users } = this.props;

    const dataColumns = _.map(items, (item, index) => {
      const selected = (selectedRows || []).indexOf(index) > -1;
      const columnCheckMenu = (
        <TableHeaderColumn
          key={`header-column-check-menu-${item.id}`}
          style={{
            paddingLeft: 6,
            paddingRight: 30,
            width: 20,
            whiteSpace: 'normal',
            wordWrap: 'normal'
          }}
          id={item.id}
          sortable={item.sortable}
          currentOrderBy={this.props.currentOrderBy}
          clickHandler={() => this.props.handleSortingSelection(item.id)}
        />
      );
      const columnsComponents = _.map(columns, (column, idx) => {
        if (!column.checked) {
          return false;
        }

        let value = item[column.id];
        const valueIsObject = _.isObject(value);
        const renderer = this.getColumnRenderer(column.id);
        const typesMap = {
          reference: () => this.renderReference(value),
          relation: () => this.renderReference(value),
          file: () => this.renderFile(value),
          datetime: () => this.renderColumnDate(value.value)
        };

        if (valueIsObject) {
          if (value.type && _.keys(typesMap).includes(value.type)) {
            value = typesMap[value.type]();
          } else {
            value = JSON.stringify(value);
          }
        }

        if (renderer) {
          // Simple string or renderer
          value = renderer(item[column.id]);
        }

        if (_.isBoolean(value) || _.isNumber(value)) {
          value = value !== null ? value.toString() : value;
        }

        if (column.id === 'username') {
          const user = _.find(users, ['id', item.owner]);

          value = user ? user.username : 'No user';
        }

        return (
          <TableRowColumn
            key={`${column.id}-${idx}`}
            style={{ width: column.width ? column.width : 100 }}
            data-e2e={`${column.id}-data-object-column`}
          >
            {value}
          </TableRowColumn>
        );
      });

      columnsComponents.unshift(columnCheckMenu);

      return (
        <TableRow
          style={{ cursor: 'pointer' }}
          key={`row-${item.id}`}
          selected={selected}
          data-e2e={`${index}-data-object-row`}
        >
          {columnsComponents}
        </TableRow>
      );
    });

    return dataColumns;
  }

  render() {
    const { items, selectedRows, handleRowSelection } = this.props;
    const { columns } = this.state;
    const { withEditDialog } = this.props;
    const tableData = this.renderTableData(items, selectedRows);
    const tableHeader = this.renderTableHeader(columns);

    return (
      <div data-e2e="data-objects-table">
        <Table
          ref="table"
          multiSelectable={true}
          showRowHover={true}
          onCellClick={withEditDialog && this.showDataObjectEditDialog}
          onRowSelection={handleRowSelection}
          wrapperStyle={{ minHeight: '120px' }}
          bodyStyle={{ overflowX: 'visible', overflowY: 'initial' }}
        >
          {tableHeader}
          <TableBody
            className="mui-table-body"
            deselectOnClickaway={false}
            showRowHover={true}
            stripedRows={false}
          >
            {tableData}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default DataObjectsTable;
