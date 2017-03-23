import React from 'react';
import { Link } from 'react-router';

import Actions from './SchedulesActions';

import { MenuItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { ColumnList } from '../../common/';

const Column = ColumnList && ColumnList.Column;

const SchedulesListItem = ({ item, onIconClick, showDeleteDialog, scriptLabel }, { params }) => (
  <ColumnList.Item
    checked={item.checked}
    key={item.id}
  >
    <Column.CheckIcon.Socket
      id={item.id.toString()}
      iconClassName="socket-schedule"
      iconColor={Colors.lime400}
      checked={item.checked}
      handleIconClick={onIconClick}
      primaryText={item.label}
      secondaryText={`ID: ${item.id}`}
    />
    <Column.Date
      date={item.scheduled_next}
      className="col-flex-1"
    />
    <Column.Desc className="col-flex-1">
      <Link
        to={{
          name: 'script',
          params: {
            instanceName: params.instanceName,
            scriptId: item.script
          }
        }}
      >
        {scriptLabel}
      </Link>
    </Column.Desc>
    <Column.Desc className="col-flex-1">
      <Link
        to={{
          name: 'schedule-traces',
          params: {
            instanceName: params.instanceName,
            scheduleId: item.id
          }
        }}
      >
        Traces
      </Link>
    </Column.Desc>
    <Column.Desc className="col-flex-1" data-e2e={`${item.label}-crontab-interval-value`}>
      {item.crontab ? item.crontab : item.interval_sec}
    </Column.Desc>
    <Column.Desc className="col-flex-1">
      {item.timezone}
    </Column.Desc>
    <Column.Menu>
      <MenuItem
        className="dropdown-item-edit"
        onTouchTap={() => Actions.showDialog(item)}
        primaryText="Edit"
      />
      <MenuItem
        className="dropdown-item-delete"
        onTouchTap={showDeleteDialog}
        primaryText="Delete"
      />
    </Column.Menu>
  </ColumnList.Item>
);

SchedulesListItem.propTypes = {
  onIconClick: React.PropTypes.func.isRequired,
  showDeleteDialog: React.PropTypes.func.isRequired
};

SchedulesListItem.contextTypes = {
  params: React.PropTypes.object
};

export default SchedulesListItem;
