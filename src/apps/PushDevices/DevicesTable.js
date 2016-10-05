import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import Moment from 'moment';

import APNSDevicesStore from '../PushDevices/APNSDevices/APNSDevicesStore';
import GCMDevicesStore from '../PushDevices/GCMDevices/GCMDevicesStore';
import APNSDevicesActions from '../PushDevices/APNSDevices/APNSDevicesActions';
import GCMDevicesActions from '../PushDevices/GCMDevices/GCMDevicesActions';

import { Loading } from '../../common';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui';

export default React.createClass({
  displayName: 'DevicesTable',

  mixins: [
    Reflux.connect(APNSDevicesStore, 'APNS'),
    Reflux.connect(GCMDevicesStore, 'GCM')
  ],

  componentDidMount() {
    APNSDevicesActions.fetchDevices();
    GCMDevicesActions.fetchDevices();
  },

  getStyles() {
    return {
      tableRowColumn: {
        textAlign: 'left'
      },
      tableRow: {
        cursor: 'pointer'
      }
    };
  },

  renderTableRows() {
    const { type } = this.props;
    const styles = this.getStyles();
    const storesMap = {
      APNS: APNSDevicesStore,
      GCM: GCMDevicesStore
    };

    if (!this.state[type] && !this.state[type].items.length) {
      return null;
    }

    return _.map(storesMap[type].getDevices(), (device) => {
      const { label, registration_id, user, is_active, created_at } = device;
      const { checkedDevicesIds } = this.props;
      const date = Moment(created_at);
      const format = date.format('DD/MM/YYYY');
      const lts = date.format('LTS');
      const isSelected = _.includes(checkedDevicesIds, registration_id);

      return (
        <TableRow
          data-e2e={`${label}-device-row`}
          key={`device${registration_id}`}
          selected={isSelected}
          style={styles.tableRow}
        >
          <TableRowColumn style={styles.tableRowColumn} colSpan={3}>
            {label}
          </TableRowColumn>
          <TableRowColumn style={styles.tableRowColumn} colSpan={3}>
            {registration_id}
          </TableRowColumn>
          <TableRowColumn style={styles.tableRowColumn} colSpan={2}>{user || 'No user'}</TableRowColumn>
          <TableRowColumn style={styles.tableRowColumn} colSpan={2}>{is_active.toString()}</TableRowColumn>
          <TableRowColumn style={styles.tableRowColumn} colSpan={2}>
            <div>
              {format}
            </div>
            <div>
              {lts}
            </div>
          </TableRowColumn>
        </TableRow>
      );
    });
  },

  render() {
    const styles = this.getStyles();
    const { type, handleCheckTableRow } = this.props;

    return (
      <div>
        <Loading show={this.state[type].isLoading}>
          <Table
            multiSelectable={true}
            onRowSelection={handleCheckTableRow}
          >
            <TableHeader
              displaySelectAll={true}
              adjustForCheckbox={true}
              enableSelectAll={true}
            >
              <TableRow>
                <TableHeaderColumn
                  style={styles.tableRowColumn}
                  colSpan={3}
                  tooltip="Device label"
                >
                  Label
                </TableHeaderColumn>
                <TableHeaderColumn
                  style={styles.tableRowColumn}
                  colSpan={3}
                  tooltip="Device registration ID"
                >
                  Registration ID
                </TableHeaderColumn>
                <TableHeaderColumn
                  style={styles.tableRowColumn}
                  colSpan={2}
                  tooltip="Device user"
                >
                  User
                </TableHeaderColumn>
                <TableHeaderColumn
                  style={styles.tableRowColumn}
                  colSpan={2}
                  tooltip="Device status"
                >
                  Active
                </TableHeaderColumn>
                <TableHeaderColumn
                  style={styles.tableRowColumn}
                  colSpan={2}
                  tooltip="Date of registration"
                >
                  Registered
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={true}
              showRowHover={true}
            >
              {this.renderTableRows()}
            </TableBody>
          </Table>
        </Loading>
      </div>
    );
  }
});
