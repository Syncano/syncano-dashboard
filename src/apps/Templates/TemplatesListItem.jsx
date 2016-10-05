import React from 'react';
import Actions from './TemplatesActions';
import { MenuItem } from 'material-ui';
import { Color, ColumnList, Truncate, LinkWrapper } from '../../common/';

const Column = ColumnList.Column;

const TemplateListItem = ({ item, onIconClick, showDeleteDialog }, { params }) => (
  <ColumnList.Item
    checked={item.checked}
    id={item.name}
    key={item.name}
  >
    <Column.CheckIcon
      className="col-xs-12"
      id={item.name}
      iconClassName="arrow-up-bold"
      keyName="name"
      background={Color.getColorByName('blue', 'xlight')}
      checked={item.checked}
      handleIconClick={onIconClick}
      primaryText={
        <LinkWrapper
          to={{
            name: 'template',
            params: { ...params, templateName: item.name }
          }}
        >
          <Truncate text={item.name} />
        </LinkWrapper>
      }
    />
    <Column.Desc className="col-flex-1">{item.content_type}</Column.Desc>
    <Column.Menu>
      <MenuItem
        className="dropdown-item-edit"
        onTouchTap={() => Actions.showDialog(item)}
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

TemplateListItem.contextTypes = {
  params: React.PropTypes.object
};

export default TemplateListItem;
