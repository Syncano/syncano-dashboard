import React from 'react';
import { withRouter } from 'react-router';

import { FlatButton } from 'material-ui';
import { ColumnList, Color } from '../../common/';

const Column = ColumnList.Column;

const CustomSocketsRegistryListItem = ({ item, onIconClick, router }) => {
  const handleRedirectToDetailsView = () => {
    router.push(`/sockets-registry/${item.id}/details/`);
  };

  const { metadata } = item;
  const metaIcon = metadata && metadata.icon ? metadata.icon : 'socket-custom-socket';
  const metaDefaultColor = Color.getColorByName('purple', 'light');
  const metaColor = metadata && metadata.color ? metadata.color : metaDefaultColor;

  return (
    <ColumnList.Item
      checked={item.checked}
      key={item.name}
    >
      <Column.CheckIcon.Socket
        className="col-sm-10"
        id={item.name}
        iconClassName={metaIcon}
        iconColor={metaColor}
        checked={item.checked}
        keyName="name"
        handleIconClick={onIconClick}
        primaryText={item.name}
        primaryTextTooltip={item.description}
      />
      <Column.Desc
        className="col-sm-5"
      >
        {item.author}
      </Column.Desc>
      <Column.Desc
        className="col-flex-2"
      >
        {item.description}
      </Column.Desc>
      <Column.Desc
        className="col-sm-7"
      >
        <FlatButton
          label="SEE DETAILS"
          onTouchTap={handleRedirectToDetailsView}
        />
      </Column.Desc>
    </ColumnList.Item>
  );
};

CustomSocketsRegistryListItem.propTypes = {
  onIconClick: React.PropTypes.func.isRequired
};

export default withRouter(CustomSocketsRegistryListItem);
