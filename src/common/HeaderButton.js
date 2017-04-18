import React from 'react';
import { FlatButton, FontIcon } from 'material-ui';

const iconStyle = {
  fontSize: '14px',
  color: '#fff',
  opacity: '0.5' };


const HeaderButton = (props) => (
  <FlatButton
    data-e2e={props['data-e2e']}
    labelStyle={{ color: '#FFFFFF', textTransform: 'none', fontWeight: '100' }}
    labelPosition="after"
    icon={<FontIcon className={props.fontIcon} style={iconStyle} />}
    hoverColor="#4C38D0"
    {...props}
  />
);

export default HeaderButton;
