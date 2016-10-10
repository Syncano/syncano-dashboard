import React from 'react';
import { InnerToolbar } from '../../common/';
import SocketsDropdown from './SocketsDropdown';

export default ({ empty = false, children }) => (
  empty
    ? <InnerToolbar title="Sockets" />
    : <InnerToolbar
      title="Sockets:"
      menu={<SocketsDropdown />}
    >
      {children}
    </InnerToolbar>
);
