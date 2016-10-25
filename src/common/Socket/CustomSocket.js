import React from 'react';
import { colors as Colors } from 'material-ui/styles/';
import SocketWrapper from './SocketWrapper';

const CustomSocket = ({ tooltip = 'Create a Socket', iconStyle, ...other }) => (
  <SocketWrapper
    {...other}
    tooltip={tooltip}
    iconClassName="synicon-socket-custom-socket"
    iconStyle={{ color: Colors.purple400, ...iconStyle }}
  />
);

export default CustomSocket;
