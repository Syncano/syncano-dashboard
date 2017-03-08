import React from 'react';
import { withRouter } from 'react-router';

import { FlatButton } from 'material-ui';
import { ColumnList, Color } from '../../common/';

const Column = ColumnList.Column;

const SocketsRegistryListItem = ({ item, router }) => {
  const handleRedirectToDetailsView = () => {
    router.push(`/sockets-registry/${item.id}/details/`);
  };

  const { metadata } = item;
  const metaIcon = metadata && metadata.icon ? metadata.icon : 'socket-custom-socket';
  const metaDefaultColor = Color.getColorByName('purple', 'light');
  const metaColor = metadata && metadata.color ? metadata.color : metaDefaultColor;

  return (
    <ColumnList.Item key={item.name}>
      <Column.CheckIcon.Socket
        className="col-sm-10"
        id={item.name}
        iconClassName={metaIcon}
        iconColor={metaColor}
        keyName="name"
        primaryText={item.name}
        primaryTextTooltip={item.description}
        checkable={false}
      />
      <Column.Desc className="col-sm-5">
        {item.author}
      </Column.Desc>
      <Column.Desc className="col-flex-2">
        {item.description}
      </Column.Desc>
      <Column.Desc className="col-sm-7">
        <FlatButton
          label="See Details"
          onTouchTap={handleRedirectToDetailsView}
        />
      </Column.Desc>
    </ColumnList.Item>
  );
};

export default withRouter(SocketsRegistryListItem);
