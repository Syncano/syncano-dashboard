import React from 'react';
import { IconButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import Truncate from '../Truncate';

const LinkWithIcon = ({ url, urlLabel, iconClassName = 'synicon-launch' }) => {
  const linkStyles = {
    cursor: 'pointer',
    color: Colors.blue500,
    width: '80%'
  };
  const linkIconStyles = {
    color: Colors.blue500,
    fontSize: 22
  };
  const containerStyles = {
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  return (
    <div style={containerStyles}>
      <div style={linkStyles}>
        <a
          href={url}
          target="_blank"
          style={linkStyles}
        >
          <Truncate text={urlLabel || url} />
        </a>
      </div>
      <IconButton
        href={url}
        target="_blank"
        iconStyle={linkIconStyles}
        iconClassName={iconClassName}
      />
    </div>
  );
};

export default LinkWithIcon;
