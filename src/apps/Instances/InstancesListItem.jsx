import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import localStorage from 'local-storage-fallback';

import InstancesStore from './InstancesStore';
import InstancesActions from './InstancesActions';
import InstanceDialogActions from './InstanceDialogActions';

import { MenuItem, FontIcon } from 'material-ui';
import { Color, ColumnList, Truncate, Tooltip } from '../../common/';

const Column = ColumnList.Column;

const InstancesListItem = ({ item, onIconClick, showDeleteDialog, router, checkable }) => {
  const { checked, name, metadata, description, created_at } = item;
  const instanceCreatedAt = Date.parse(created_at);
  const releaseDate = Number(APP_CONFIG.SYNCANO5_RELEASE_DATE);
  const styles = {
    tooltipRoot: {
      display: 'flex',
      color: '#FF0000',
      fontWeight: 100,
      flexGrow: 1,
      height: 19
    },
    tooltipContent: {
      fontSize: 14,
      lineHeight: '18px',
      padding: 5,
      top: -5
    }
  };
  const handleInstanceNameClick = () => {
    localStorage.setItem('lastInstanceName', name);
    router.push(`/instances/${name}/`);
  };
  const showEditDialog = () => {
    InstanceDialogActions.showDialog(item);
  };
  const setClickedInstance = () => {
    InstancesActions.setClickedInstance(item);
  };

  const maintenanceInfo = () => {
    const tooltipContent = () => (
      <div style={{ whiteSpace: 'pre-wrap' }}>
        This instance will not receive the upcoming features of Syncano<br />
        as it was built on a previous version.
        <span style={{ fontWeight: 700 }}> Click on the tooltip</span> to contact us for more information.
      </div>
    );

    return (
      <Tooltip
        label={tooltipContent()}
        style={styles.tooltipContent}
        rootStyle={styles.tooltipRoot}
        touch={true}
        onClick={() => window._elev.openModule('intercom')}
      >
        <FontIcon
          color="#FF0000"
          style={{ fontSize: 16, marginRight: 5 }}
          className="synicon-alert"
        />
        maintenance
      </Tooltip>
    );
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
        secondaryText={instanceCreatedAt < releaseDate && maintenanceInfo()}
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
