import React from 'react';
import { withRouter } from 'react-router';
import localStorage from 'local-storage-fallback';

// Stores and Actions
import Actions from './InstancesActions';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';

import { MenuItem } from 'material-ui';
import { ColumnList, Color, Truncate } from '../../common/';

const Column = ColumnList.Column;

const InstancesListItem = ({ item, onIconClick, showDeleteDialog, router, checkable }) => {
  const handleClickInstanceName = () => {
    localStorage.setItem('lastInstanceName', item.name);
    router.push(`/instances/${item.name}/`);
  };
  const showEditDialog = () => {
    InstanceDialogActions.showDialog(item);
  };
  const setClickedInstance = () => {
    Actions.setClickedInstance(item);
  };

  return (
    <ColumnList.Item
      checked={item.checked}
      id={item.name}
      key={item.name}
    >
      <Column.CheckIcon
        id={item.name}
        iconClassName={item.metadata.icon}
        background={Color.getColorByName(item.metadata.color)}
        checkable={checkable}
        checked={item.checked}
        handleIconClick={onIconClick}
        primaryText={
          <Truncate
            onClick={handleClickInstanceName}
            style={{ cursor: 'pointer' }}
            text={item.name}
          />
        }
      />
      <Column.Desc>{item.description}</Column.Desc>
      <Column.Date date={item.created_at} />
      <Column.Menu handleClick={setClickedInstance}>
        <MenuItem
          className="dropdown-item-instance-edit"
          onTouchTap={showEditDialog}
          primaryText="Edit"
        />
        <MenuItem
          className="dropdown-item-instance-delete"
          onTouchTap={showDeleteDialog}
          primaryText={Store.amIOwner(item) ? 'Delete' : 'Leave'}
        />
      </Column.Menu>
    </ColumnList.Item>
  );
};

InstancesListItem.propTypes = {
  onIconClick: React.PropTypes.func,
  showDeleteDialog: React.PropTypes.func.isRequired
};

export default withRouter(InstancesListItem);
