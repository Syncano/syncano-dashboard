import React from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import { colors as Colors } from 'material-ui/styles';
import './SelectWrapper.css';

export default ({ errorText, errorStyle, className, ...other }) => {
  const errorDefaultStyle = {
    color: Colors.red500,
    fontSize: 12,
    margin: 4
  };
  const classes = classNames(
    { [className]: true },
    { 'select-wrapper-errors': errorText.length > 0 }
  );

  return (
    <div data-e2e={other['data-e2e']}>
      <Select
        {...other}
        className={classes}
      />
      <div style={{ ...errorDefaultStyle, ...errorStyle }}>{errorText}</div>
    </div>
  );
};
