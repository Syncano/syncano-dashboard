import React from 'react';
import Radium from 'radium';
import { Link, withRouter } from 'react-router';

import { DialogsMixin } from '../../mixins';

import Actions from './ClassesActions';

import { MenuItem } from 'material-ui';
import { ColumnList, Color, DataObjectsAmount } from '../../common';

const Column = ColumnList && ColumnList.Column;

const ClassesListItem = Radium(React.createClass({
  displayName: 'ClassesListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [DialogsMixin],

  render() {
    const { params } = this.context;
    const { item, onIconClick, showDeleteDialog } = this.props;
    const metadata = item.metadata;

    return (
      <ColumnList.Item
        key={item.name}
        id={item.name}
        checked={item.checked}
      >
        <Column.CheckIcon
          id={item.name}
          iconClassName={metadata && metadata.icon ? metadata.icon : 'table-large'}
          background={Color.getColorByName(metadata && metadata.color ? metadata.color : 'blue')}
          checked={item.checked}
          keyName="name"
          handleIconClick={onIconClick}
          primaryText={item.name}
          secondaryText={item.description}
        />
        <Column.Desc className="col-flex-1">
          <DataObjectsAmount
            data-e2e={`${item.name}-data-objects`}
            className={item.name}
            dataObjects={item.objects_count}
          />
        </Column.Desc>
        <Column.ID className="col-flex-1">
          <Link
            to={{
              name: 'users',
              params
            }}
          >
            {item.group}
          </Link>
        </Column.ID>
        <Column.Desc className="col-flex-1">
          <div>
            <div>group: {item.group_permissions}</div>
            <div>other: {item.other_permissions}</div>
          </div>
        </Column.Desc>
        <Column.Date date={item.created_at} />
        <Column.Menu handleClick={() => Actions.setClickedClass(item)}>
          <MenuItem
            className="dropdown-item-add-object"
            onTouchTap={() => this.props.router.push({
              pathname: `${this.props.location.pathname}/${item.name}/objects/`,
              state: { showDialog: true }
            })}
            primaryText="Add object"
          />
          <MenuItem
            className="dropdown-item-edit-class"
            onTouchTap={() => Actions.showDialog({ classData: item })}
            primaryText="Edit"
          />
          <MenuItem
            className="dropdown-item-delete-class"
            disabled={item.protectedFromDelete}
            onTouchTap={showDeleteDialog}
            primaryText="Delete"
          />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
}));

export default withRouter(ClassesListItem);
