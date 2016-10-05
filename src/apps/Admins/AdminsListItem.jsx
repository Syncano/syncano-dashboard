import React from 'react';

import { DialogsMixin } from '../../mixins/';

import Actions from './AdminsActions';
import SessionStore from '../Session/SessionStore';

import { MenuItem } from 'material-ui';
import { ColumnList, Color } from '../../common/';

export default React.createClass({
  displayName: 'AdminsListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  mixins: [DialogsMixin],

  renderEditAdmin(item, isOwner) {
    if (isOwner) {
      return true;
    }

    return (
      <MenuItem
        className="dropdown-item-edit-admin"
        onTouchTap={() => Actions.showDialog(item)}
        primaryText="Edit"
      />
    );
  },

  render() {
    const { item, onIconClick, showDeleteDialog } = this.props;
    const isOwner = item.id === SessionStore.getInstance().owner.id;

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
          checkable={!isOwner}
          primaryText={item.email}
          secondaryText={isOwner ? 'Owner (cannot be edited)' : null}
        />
        <ColumnList.Column.Desc />
        <ColumnList.Column.Text>{item.role}</ColumnList.Column.Text>
        <ColumnList.Column.Date date={null} />
        <ColumnList.Column.Menu>
          {this.renderEditAdmin(item, isOwner)}
          <MenuItem
            className="dropdown-item-delete-admin"
            onTouchTap={showDeleteDialog}
            primaryText="Delete"
          />
        </ColumnList.Column.Menu>
      </ColumnList.Item>
    );
  }
});
