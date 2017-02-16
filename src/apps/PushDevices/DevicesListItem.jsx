import React from 'react';

import { SnackbarNotificationMixin } from '../../mixins';

import { MenuItem } from 'material-ui';
import { Color, ColumnList, Clipboard, Truncate } from '../../common/';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DeviceListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showEditDialog: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  mixins: [SnackbarNotificationMixin],

  render() {
    const {
      item,
      icon,
      onIconClick,
      showEditDialog,
      showDeleteDialog
    } = this.props;

    return (
      <ColumnList.Item
        key={item.registration_id}
        checked={item.checked}
      >
        <Column.CheckIcon
          id={item.registration_id}
          iconClassName={icon}
          className="col-sm-14"
          checked={item.checked}
          keyName="registration_id"
          background={Color.getColorByName('blue')}
          handleIconClick={onIconClick}
          primaryText={item.label}
          secondaryText={
            <Clipboard
              copyText={item.registration_id}
              onCopy={() => this.setSnackbarNotification({
                message: 'Registration ID copied to the clipboard!'
              })}
              tooltip="Copy registration ID"
              type="link"
            />
          }
        />
        <Column.Desc className="col-sm-6">
          <Truncate text={JSON.stringify(item.metadata)} />
        </Column.Desc>
        <Column.Desc>
          {item.userName}
        </Column.Desc>
        <Column.Desc>
          {item.is_active.toString()}
        </Column.Desc>
        <Column.Date date={item.created_at} />
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => showEditDialog(item)}
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
