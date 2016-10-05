import React from 'react';

import ActiveStatusLabel from './ActiveStatusLabel';
import InactiveStatusLabel from './InactiveStatusLabel';

const StatusLabel = ({ isActive = false, activeStyles, inactiveStyles, withActive = true, withInactive = true }) => {
  if (isActive && withActive) {
    return <ActiveStatusLabel style={activeStyles} />;
  }

  if (!isActive && withInactive) {
    return <InactiveStatusLabel style={inactiveStyles} />;
  }

  return null;
};

export default StatusLabel;
