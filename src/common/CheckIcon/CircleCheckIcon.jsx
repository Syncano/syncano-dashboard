import React from 'react';

import CheckIcon from './CheckIcon';

export default (props) => {
  const icon = {
    className: props.iconClassName,
    color: '#FFF',
    circleColor: props.background
  };

  return (
    <CheckIcon
      {...props}
      icon={icon}
    />
  );
};
