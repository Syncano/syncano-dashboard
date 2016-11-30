import React, { Component } from 'react';
import _ from 'lodash';
import Moment from 'moment';
import localStorage from 'local-storage-fallback';

import Store from './DataObjectsStore';

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  FontIcon,
  TableHeaderColumn,
  TableHeader
} from 'material-ui';
import { ShowMore } from '../../common';
import ColumnsFilterMenu from './ColumnsFilterMenu';

class DataObjectsTable extends Component {
  static defaultProps = {
    withEditDialog: true
  };

  constructor(props) {
    super(props);

    let columns = [
      {
        id: 'id',
        width: 90,
        tooltip: 'Built-in property: ID',
        checked: true
      },
      {
        id: 'revision',
        width: 20,
        tooltip: 'Built-in property: Revision',
        checked: true
      },
      {
        id: 'owner',
        width: 90,
        tooltip: 'Owner',
        checked: false
      },
      {
        id: 'group',
        width: 90,
        tooltip: 'Built-in property: Group',
        checked: false
      },
      {
        id: 'owner_permissions',
        width: 90,
        tooltip: 'Built-in property: Owner Permissions',
        checked: false
      },
      {
        id: 'group_permissions',
        width: 90,
        tooltip: 'Built-in property: Group Permissions',
        checked: false
      },
      {
        id: 'other_permissions',
        width: 90,
        tooltip: 'Built-in property: Other Permissions',
        checked: false
      },
      {
        id: 'channel',
        width: 90,
        tooltip: 'Built-in property: Channel',
        checked: false
      },
      {
        id: 'channel_room',
        width: 90,
        tooltip: 'Built-in property: Channel room',
        checked: false
      },
      {
        id: 'created_at',
        width: 120,
        tooltip: 'Built-in property: Created At',
        checked: true
      },
      {
        id: 'updated_at',
        width: 120,
        tooltip: 'Built-in property: Updated At',
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
      tooltip: `Custom property: ${item.name} (type: ${item.type})`,
      checked: true
    }));

    columns = [...columns, ...schemaColumns];

    if (className === 'user_profile') {
      columns.unshift({
        id: 'username',
        width: 120,
        tooltip: 'Built-in property: Username',
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
      Store.getSelectedRowObj(cellNumber);
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
      return '';
    }

    return (
      <div>
        <div>{Moment(value).format('DD/MM/YYYY')}</div>
        <div>{Moment(value).format('LTS')}</div>
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
    const getTooltipPosition = (index) => {
      if (index === columns.length - 1) {
        return { left: '-75%' };
      }
      if (index === columns.length - 2) {
        return { left: '-50%' };
      }

      return null;
    };

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
            tooltip={item.tooltip}
            tooltipStyle={getTooltipPosition(index)}
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
            data-e2e={`${column.id}-data-object-column`}
            key={`${column.id}-${idx}`}
            style={{ width: column.width ? column.width : 100 }}
          >
            {value}
          </TableRowColumn>
        );
      });

      columnsComponents.unshift(columnCheckMenu);

      return (
        <TableRow
          data-e2e={`${index}-data-object-row`}
          style={{ cursor: 'pointer' }}
          key={`row-${item.id}`}
          selected={selected}
        >
          {columnsComponents}
        </TableRow>
      );
    });

    return dataColumns;
  }

  render() {
    const {
      items,
      isLoading,
      hasNextPage,
      selectedRows,
      handleMoreRows,
      handleRowSelection
    } = this.props;
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

        <div
          className="row align-center"
          style={{ margin: '50px 0 20px' }}
        >
          <div>Loaded {tableData.length} Data Objects</div>
        </div>
        <ShowMore
          label="Load more"
          visible={hasNextPage && !isLoading}
          onTouchTap={handleMoreRows}
        />
      </div>
    );
  }
}

export default DataObjectsTable;
