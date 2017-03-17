import React from 'react';
import { MenuItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { ColumnList } from '../../common/';

const Column = ColumnList && ColumnList.Column;

const ProfileInvitationsListItem = ({ item, onIconClick, showAcceptDialog, showDeclineDialog }) => (
  <ColumnList.Item
    checked={item.checked}
    key={item.id}
  >
    <Column.CheckIcon
      id={item.id.toString()}
      iconClassName="account"
      background={Colors.blue500}
      checked={item.checked}
      handleIconClick={onIconClick}
      primaryText={item.instance}
    />
    <Column.Desc>{item.inviter}</Column.Desc>
    <Column.Desc>{item.role}</Column.Desc>
    <Column.Date date={item.created_at} />
    <Column.Menu>
      <MenuItem
        className="dropdown-item-invitation-accept"
        onTouchTap={showAcceptDialog}
        primaryText="Accept"
      />
      <MenuItem
        className="dropdown-item-invitation-decline"
        onTouchTap={showDeclineDialog}
        primaryText="Decline"
      />
    </Column.Menu>
  </ColumnList.Item>
);

ProfileInvitationsListItem.propTypes = {
  onIconClick: React.PropTypes.func.isRequired,
  showAcceptDialog: React.PropTypes.func.isRequired,
  showDeclineDialog: React.PropTypes.func.isRequired
};

export default ProfileInvitationsListItem;
