import React from 'react';
import { Link } from 'react-router';

import { DialogsMixin } from '../../mixins';

import TriggersStore from './TriggersStore';
import TriggersActions from './TriggersActions';
import ClassesStore from '../Classes/ClassesStore';

import { MenuItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { ColumnList, DataObjectsAmount } from '../../common/';

const Column = ColumnList && ColumnList.Column;

export default React.createClass({
  displayName: 'TriggersListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [DialogsMixin],

  handleEditTouchTap() {
    const { item } = this.props;

    TriggersActions.showDialog(item);
  },

  render() {
    const { instanceName } = this.context.params;
    const { item, onIconClick, showDeleteDialog, scriptLabel } = this.props;
    const itemClass = ClassesStore.getClassByName(item.class);

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}
      >
        <Column.CheckIcon.Socket
          id={item.id.toString()}
          iconClassName="socket-trigger"
          iconColor={Colors.amberA200}
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={item.label}
        />
        <Column.Desc className="col-flex-1">
          <DataObjectsAmount
            className={itemClass ? itemClass.name : null}
            dataObjects={itemClass ? itemClass.objects_count : null}
          />
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link
            to={{
              name: 'script',
              params: {
                instanceName,
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
              name: 'trigger-traces',
              params: {
                instanceName,
                triggerId: item.id
              }
            }}
          >
            Traces
          </Link>
        </Column.Desc>
        <Column.Desc
          className="col-flex-1"
          data-e2e={`${item.label}-signal-value`}
        >
          {TriggersStore.getSignalLabel(item.signal)}
        </Column.Desc>
        <Column.Menu data-e2e={`${item.label}-trigger-list-item-menu`}>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={this.handleEditTouchTap}
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
  }
});
