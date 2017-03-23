import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import localStorage from 'local-storage-fallback';

import InstancesStore from './InstancesStore';
import InstancesActions from './InstancesActions';
import InstanceDialogActions from './InstanceDialogActions';

import { MenuItem } from 'material-ui';
import { Color, ColumnList, Truncate } from '../../common/';

const Column = ColumnList && ColumnList.Column;

const InstancesListItem = ({ item, onIconClick, showDeleteDialog, router, checkable }) => {
  const { checked, name, metadata, description, created_at } = item;
  const handleInstanceNameClick = () => {
    localStorage.setItem('lastInstanceName', name);
    router.push(`/instances/${name}/sockets/`);
  };
  const showEditDialog = () => {
    InstanceDialogActions.showDialog(item);
  };
  const setClickedInstance = () => {
    InstancesActions.setClickedInstance(item);
  };

  return (
    <ColumnList.Item
      checked={checked}
      id={name}
      key={name}
      data-e2e={`${name}-list-row-name`}
    >
      <Column.CheckIcon
        id={name}
        iconClassName={metadata.icon}
        background={Color.getColorByName(metadata.color)}
        checkable={checkable}
        checked={checked}
        handleIconClick={onIconClick}
        primaryText={
          <Truncate
            text={name}
            style={{ cursor: 'pointer' }}
            onClick={handleInstanceNameClick}
          />
        }
      />
      <Column.Desc>{description}</Column.Desc>
      <Column.Date date={created_at} />
      <Column.Menu handleClick={setClickedInstance}>
        <MenuItem
          primaryText="Edit"
          className="dropdown-item-instance-edit"
          onTouchTap={showEditDialog}
        />
        <MenuItem
          primaryText={InstancesStore.amIOwner(item) ? 'Delete' : 'Leave'}
          className="dropdown-item-instance-delete"
          onTouchTap={showDeleteDialog}
        />
      </Column.Menu>
    </ColumnList.Item>
  );
};

InstancesListItem.propTypes = {
  onIconClick: PropTypes.func,
  showDeleteDialog: PropTypes.func.isRequired
};

export default withRouter(InstancesListItem);
