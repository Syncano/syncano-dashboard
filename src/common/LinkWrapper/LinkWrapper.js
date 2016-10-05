import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import { colors as Colors } from 'material-ui/styles/';

const RadiumLink = Radium(Link);

export default Radium(({ style, children, ...other }) => {
  const styles = {
    color: '#444',
    cursor: 'pointer',
    ':hover': {
      color: Colors.blue400
    }
  };

  return (
    <RadiumLink
      style={{ ...styles, ...style }}
      {...other}
    >
      {children}
    </RadiumLink>
  );
});
