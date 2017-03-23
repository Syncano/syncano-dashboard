import React from 'react';

import Actions from './UsersActions';

import UserInfo from './UserInfo';
import { MenuItem } from 'material-ui';
import { ColumnList, Color } from '../../common/';

const Column = ColumnList && ColumnList.Column;

export default React.createClass({
  displayName: 'UsersListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      userInfoVisible: false
    };
  },

  getStyles() {
    return {
      groupsList: {
        margin: '0 -4px',
        padding: 0,
        listStyle: 'none'
      },
      groupsListItem: {
        display: 'inline-block',
        lineHeight: '24px',
        border: '1px solid #ddd',
        borderRadius: 2,
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 12,
        padding: '0 4px',
        margin: 4,
        background: '#fff'
      },
      showInfoItem: {
        cursor: 'pointer'
      }
    };
  },

  toggleUserInfo(event) {
    event.preventDefault();
    this.setState({
      userInfoVisible: !this.state.userInfoVisible
    });
  },

  renderItemGroups(groups) {
    const styles = this.getStyles();

    if (typeof groups === 'undefined') {
      return true;
    }

    if (groups.length === 0) {
      return 'No group';
    }

    const itemGroups = groups.map((group) => <li key={group.label} style={styles.groupsListItem}>{group.label}</li>);

    return (
      <ul style={styles.groupsList}>{itemGroups}</ul>
    );
  },

  render() {
    const { item, onIconClick, showDeleteDialog } = this.props;
    const { userInfoVisible } = this.state;

    return (
      <div>
        <ColumnList.Item
          checked={item.checked}
          key={item.id}
        >
          <Column.CheckIcon
            id={item.id.toString()}
            iconClassName="account"
            background={Color.getColorByName('blue', 'xlight')}
            checked={item.checked}
            handleIconClick={onIconClick}
            primaryText={item.username}
            secondaryText={`ID: ${item.id}`}
          />
          <Column.Desc>{this.renderItemGroups(item.groups)}</Column.Desc>
          <Column.Desc className="col-xs-4">
            <a href="" onClick={this.toggleUserInfo}>
              {!userInfoVisible ? 'Show' : 'Hide'}
            </a>
          </Column.Desc>
          <Column.Date date={item.profile.updated_at} />
          <Column.Date date={item.profile.created_at} />
          <Column.Menu>
            <MenuItem
              className="dropdown-item-edit-user"
              onTouchTap={() => Actions.showDialog(item)}
              primaryText="Edit"
            />
            <MenuItem
              className="dropdown-item-delete-user"
              onTouchTap={showDeleteDialog}
              primaryText="Delete"
            />
          </Column.Menu>
        </ColumnList.Item>
        <div>
          <UserInfo
            visible={userInfoVisible}
            user={item}
          />
        </div>
      </div>
    );
  }
});

