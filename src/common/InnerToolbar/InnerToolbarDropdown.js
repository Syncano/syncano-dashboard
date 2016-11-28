import React from 'react';
import { withRouter } from 'react-router';
import { DropDownMenu } from 'material-ui';

const InnerToolbarDropdown = ({ routes, children, router, params, ...other }) => {
  const lastItem = routes[routes.length - 1].name;
  const notLastItem = routes[routes.length - 2].name;
  const handleUpdateDropdown = (event, index, value) => router.push({ name: value, params });
  const styles = {
    icon: {
      fill: 'rgba(0, 0, 0, 0.4)',
      top: 12
    },
    label: {
      paddingLeft: 12,
      fontSize: 20,
      lineHeight: '48px',
      color: 'rgba(0, 0, 0, 0.4)'
    }
  };

  return (
    <DropDownMenu
      {...other}
      value={lastItem || notLastItem}
      labelStyle={styles.label}
      iconStyle={styles.icon}
      onChange={handleUpdateDropdown}
      underlineStyle={{ display: 'none' }}
    >
      {children}
    </DropDownMenu>
  );
};

export default withRouter(InnerToolbarDropdown);
