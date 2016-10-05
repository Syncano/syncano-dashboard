import React from 'react';
import { withRouter } from 'react-router';
import { DropDownMenu } from 'material-ui';

const InnerToolbarDropdown = ({ routes, children, router, params, ...other }) => {
  const lastItem = routes[routes.length - 1].name;
  const notLastItem = routes[routes.length - 2].name;
  const labelStyle = {
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.4)'
  };
  const iconStyle = {
    fill: 'rgba(0, 0, 0, 0.4)'
  };
  const handleUpdateDropdown = (event, index, value) => router.push({ name: value, params });

  return (
    <DropDownMenu
      {...other}
      value={lastItem || notLastItem}
      labelStyle={labelStyle}
      iconStyle={iconStyle}
      onChange={handleUpdateDropdown}
      underlineStyle={{ display: 'none' }}
    >
      {children}
    </DropDownMenu>
  );
};

export default withRouter(InnerToolbarDropdown);
