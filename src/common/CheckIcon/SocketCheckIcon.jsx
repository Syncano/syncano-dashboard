import React from 'react';
import CheckIcon from './CheckIcon';
import { colors as Colors } from 'material-ui/styles/';

export default (props) => {
  const icon = {
    className: props.iconClassName,
    color: props.iconColor,
    circleColor: 'none'
  };

  const checkedIcon = {
    className: 'socket-checkbox-marked',
    color: Colors.lightBlue500,
    circleColor: 'none'
  };

  const hoveredIcon = {
    className: 'socket-checkbox-blank',
    color: 'rgba(0,0,0,0.2)',
    circleColor: 'none'
  };

  const styles = {
    fontSize: 36,
    display: 'flex'
  };

  return (
    <CheckIcon
      {...props}
      iconStyle={{ ...styles, ...props.iconStyle }}
      icon={icon}
      checkedIcon={checkedIcon}
      hoveredIcon={hoveredIcon}
    />
  );
};
