import React from 'react';

const DialogSidebarSection = ({ last, title, children }) => (
  <div className={!last ? 'vm-2-b' : ''}>
    {title && <div><strong>{title}</strong></div>}
    {children}
  </div>
);

export default DialogSidebarSection;
