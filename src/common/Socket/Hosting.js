import React from 'react';
import { colors as Colors } from 'material-ui/styles/';
import SocketWrapper from './SocketWrapper';

const HostingSocket = ({ tooltip = 'Create a Hosting Socket', iconStyle, ...other }) => (
  <SocketWrapper
    {...other}
    tooltip={tooltip}
    iconClassName="synicon-socket-hosting"
    iconStyle={{ color: Colors.orange600, ...iconStyle }}
  />
);

export default HostingSocket;
