import React from 'react';
import { InnerToolbar } from '../../common/';
import SnippetsDropdown from './SnippetsDropdown';

export default ({ children }) => (
  <InnerToolbar
    title="Snippets:"
    menu={<SnippetsDropdown />}
  >
    {children}
  </InnerToolbar>
);
