import React from 'react';
import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import Truncate from '../Truncate';

const LinkWithIcon = ({ url, iconClassName = 'synicon-launch' }) => {
  const linkStyles = {
    color: Colors.blue500,
    display: 'flex',
    alignItems: 'center'
  };
  const linkIconStyles = {
    paddingTop: 2,
    marginRight: 8,
    color: Colors.blue500,
    fontSize: 16,
    maxWidth: 16
  };
  const linkUrl = url.indexOf('http') > -1 ? url : `http://${url}`;

  return (
    <a
      href={linkUrl}
      target="_blank"
      style={linkStyles}
    >
      <FontIcon
        style={linkIconStyles}
        className={iconClassName}
      />
      <Truncate text={url} />
    </a>
  );
};

export default LinkWithIcon;
