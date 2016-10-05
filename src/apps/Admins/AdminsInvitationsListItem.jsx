import React from 'react';

import { DialogsMixin } from '../../mixins';

import { MenuItem } from 'material-ui';
import { ColumnList, Color } from '../../common/';

export default React.createClass({
  displayName: 'AdminsInvitationsListItem',

  propTypes: {
    showResendDialog: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  mixins: [DialogsMixin],

  render() {
    const { item, onIconClick, showResendDialog, showDeleteDialog } = this.props;

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}
      >
        <ColumnList.Column.CheckIcon
          className="col-xs-25 col-md-20"
          id={item.id.toString()}
          iconClassName="account"
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={item.email}
        />
        <ColumnList.Column.Desc />
        <ColumnList.Column.Text>{item.role}</ColumnList.Column.Text>
        <ColumnList.Column.Date date={item.created_at} />
        <ColumnList.Column.Menu data-e2e="admins-invitations-list-item-menu">
          <MenuItem
            onTouchTap={showResendDialog}
            className="dropdown-item-resend-invitation"
            primaryText="Resend"
          />
          <MenuItem
            onTouchTap={showDeleteDialog}
            className="dropdown-item-remove-invitation"
            primaryText="Delete"
          />
        </ColumnList.Column.Menu>
      </ColumnList.Item>
    );
  }
});
