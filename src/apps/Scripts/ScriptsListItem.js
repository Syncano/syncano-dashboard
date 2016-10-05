import React from 'react';

import Actions from './ScriptsActions';
import RuntimesStore from '../Runtimes/RuntimesStore';

import { MenuItem } from 'material-ui';
import { ColumnList, Truncate, LinkWrapper } from '../../common/';

const Column = ColumnList.Column;

const ScriptsListItem = ({ item, onIconClick, showDeleteDialog }, { params }) => {
  const runtime = RuntimesStore.getRuntimeByKey(item.runtime_name) || {};

  return (
    <ColumnList.Item
      checked={item.checked}
      key={item.id}
      id={item.id}
    >
      <Column.CheckIcon
        id={item.id.toString()}
        iconClassName={runtime.icon}
        background={runtime.color}
        checked={item.checked}
        handleIconClick={onIconClick}
        primaryText={
          <LinkWrapper
            to={{
              name: 'script',
              params: { ...params, scriptId: item.id }
            }}
          >
            <Truncate text={item.label} />
          </LinkWrapper>
        }
        secondaryText={`ID: ${item.id}`}
        data-e2e={`${runtime.icon}-check-icon`}
      />
      <Column.Desc>{item.description}</Column.Desc>
      <Column.Date date={item.created_at} />
      <Column.Menu>
        <MenuItem
          className="dropdown-item-script-edit"
          onTouchTap={() => Actions.showDialog({ scriptData: item })}
          primaryText="Edit"
        />
        <MenuItem
          className="dropdown-item-script-delete"
          onTouchTap={showDeleteDialog}
          primaryText="Delete"
        />
      </Column.Menu>
    </ColumnList.Item>
  );
};

ScriptsListItem.propTypes = {
  onIconClick: React.PropTypes.func.isRequired,
  showDeleteDialog: React.PropTypes.func.isRequired
};

ScriptsListItem.contextTypes = {
  params: React.PropTypes.object
};

export default ScriptsListItem;
