import React from 'react';
import InnerToolbarDropdown from '../../common/InnerToolbar/InnerToolbarDropdown';
import { MenuItem } from 'material-ui';

const menuItemstyle = {
  cursor: 'pointer'
};

const SocketsDropdown = () => (
  <InnerToolbarDropdown>
    <MenuItem style={menuItemstyle} value="sockets" primaryText="All" />
    <MenuItem style={menuItemstyle} value="data" primaryText="Data Endpoints" />
    <MenuItem style={menuItemstyle} value="script-endpoints" primaryText="Script Endpoints" />
    <MenuItem style={menuItemstyle} value="triggers" primaryText="Triggers" />
    <MenuItem style={menuItemstyle} value="schedules" primaryText="Schedules" />
    <MenuItem style={menuItemstyle} value="channels" primaryText="Real-time Channels" />
    <MenuItem style={menuItemstyle} value="hosting" primaryText="Hosting" />
    <MenuItem style={menuItemstyle} value="custom-sockets" primaryText="Sockets" />
    <MenuItem style={menuItemstyle} value="push-notification-config" primaryText="Push Notifications" />
  </InnerToolbarDropdown>
);

export default SocketsDropdown;
