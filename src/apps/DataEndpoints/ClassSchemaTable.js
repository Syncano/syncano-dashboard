import React from 'react';
import _ from 'lodash';

import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableBody,
  FontIcon
} from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { Tooltip } from '../../common/';

export default React.createClass({
  displayName: 'ClassSchemaTable',

  getStyles() {
    return {
      tableRow: {
        textAlign: 'left',
        overflow: 'visible'
      },
      tooltip: {
        top: '-50%',
        right: '100%'
      }
    };
  },

  isExpandChecked(field) {
    const { expandedFields } = this.props;
    const fields = expandedFields.length ? expandedFields.split(',') : [];

    return _.some(fields, (item) => item === field.name);
  },

  isExcludedChecked(field) {
    const { excludedFieldsNames } = this.props;
    const fields = excludedFieldsNames.length ? excludedFieldsNames.split(',') : [];

    return !_.some(fields, (item) => item === field.name);
  },

  handleExpandClick(event, isChecked, fieldName, isDisabled) {
    const { handleExpandField } = this.props;

    event.stopPropagation();

    if (!isDisabled) {
      handleExpandField(!isChecked, fieldName);
    }
  },

  renderExpandIcon(obj) {
    return (
      <div onClick={(event) => this.handleFileOnClick(event, obj.value)}>
        <FontIcon className="synicon-download" />
      </div>
    );
  },

  renderExpandTooltip() {
    const styles = this.getStyles();

    return (
      <Tooltip
        label="Expand is available for relation and reference fields only"
        horizontalPosition="left"
        style={styles.tooltip}
      >
        <FontIcon
          style={{ cursor: 'pointer' }}
          color={Colors.grey400}
          className="synicon-checkbox-blank-outline"
        />
      </Tooltip>
    );
  },

  renderCheckBoxIcon(isChecked, clickable) {
    if (isChecked) {
      return (
        <FontIcon
          style={clickable && { cursor: 'pointer' }}
          color={clickable ? Colors.indigo900 : Colors.grey400}
          className="synicon-checkbox-marked"
        />
      );
    }

    return (
      <FontIcon
        style={clickable && { cursor: 'pointer' }}
        color={clickable ? Colors.indigo900 : Colors.grey400}
        className="synicon-checkbox-blank-outline"
      />
    );
  },

  renderFields() {
    const styles = this.getStyles();

    if (!_.isEmpty(this.props.class)) {
      return _.map(this.props.class.schema, (field) => {
        const isExpandChecked = this.isExpandChecked(field);
        const isExpandDisabled = field.type !== 'reference';

        return (
          <TableRow
            key={`field${field.name}`}
            selected={this.isExcludedChecked(field)}
            style={{ overflow: 'visible' }}
          >
            <TableRowColumn
              style={styles.tableRow}
              colSpan={3}
            >
              {field.name}
              <div style={{ fontSize: 11, color: Colors.grey600 }}>
                {field.type}
              </div>
            </TableRowColumn>
            <TableRowColumn
              style={styles.tableRow}
              colSpan={2}
            >
              {field.target}
            </TableRowColumn>
            <TableRowColumn
              style={styles.tableRow}
              colSpan={1}
            >
              <Tooltip
                label="Edit Data Class to change the Filter"
                horizontalPosition="left"
                style={styles.tooltip}
              >
                {this.renderCheckBoxIcon(field.filter_index)}
              </Tooltip>
            </TableRowColumn>
            <TableRowColumn
              style={styles.tableRow}
              colSpan={1}
            >
              <Tooltip
                label="Edit Data Class schema to enable ordering"
                horizontalPosition="left"
                style={styles.tooltip}
              >
                {this.renderCheckBoxIcon(field.order_index)}
              </Tooltip>
            </TableRowColumn>
            <TableRowColumn
              style={styles.tableRow}
              colSpan={1}
            >
              <div onClick={(event) => this.handleExpandClick(event, isExpandChecked, field.name, isExpandDisabled)}>
                {isExpandDisabled ?
                  this.renderExpandTooltip() :
                  this.renderCheckBoxIcon(isExpandChecked, !isExpandDisabled)}
              </div>
            </TableRowColumn>
          </TableRow>
        );
      });
    }

    return null;
  },

  render() {
    const { handleClickRowCheckbox } = this.props;
    const styles = this.getStyles();

    return (
      <div>
        <Table
          multiSelectable={true}
          onRowSelection={handleClickRowCheckbox}
          wrapperStyle={{ overflow: 'visible' }}
          style={{ overflow: 'visible' }}
        >
          <TableHeader
            displaySelectAll={true}
            adjustForCheckbox={true}
            enableSelectAll={true}
          >
            <TableRow>
              <TableHeaderColumn
                style={styles.tableRow}
                colSpan={3}
                tooltip="Field name"
              >
                Name
              </TableHeaderColumn>
              <TableHeaderColumn
                style={styles.tableRow}
                colSpan={2}
                tooltip="Target Data Class (reference and relation only)"
              >
                Target Data Class
              </TableHeaderColumn>
              <TableHeaderColumn
                style={styles.tableRow}
                colSpan={1}
                tooltip="Indicate if response can be filtered by this field value"
              >
                Filter
              </TableHeaderColumn>
              <TableHeaderColumn
                style={styles.tableRow}
                colSpan={1}
                tooltipStyle={{ left: '-100%' }}
                tooltip="Indicate if response can be ordered by this field value"
              >
                Order
              </TableHeaderColumn>
              <TableHeaderColumn
                style={styles.tableRow}
                colSpan={1}
                tooltipStyle={{ right: '10%' }}
                tooltip="Indicate if this field can be expanded in response"
              >
                Expand
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            selectAsClick={true}
            deselectOnClickaway={false}
            showRowHover={true}
          >
            {this.renderFields()}
          </TableBody>
        </Table>
      </div>
    );
  }
});
