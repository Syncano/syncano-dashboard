import React from 'react';
import _ from 'lodash';

import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

import DirectoryNavigationLink from './DirectoryNavigationLink';

const DirectoryNavigation = ({ previousFolders, directoryDepth, moveDirectoryUp }) => {
  const styles = {
    root: {
      height: 50,
      display: 'flex',
      background: 'rgb(252, 252, 252)',
      border: '1px solid rgb(238, 238, 238)',
      marginBottom: 15,
      borderRadius: 2,
      paddingLeft: 15,
      paddingRight: 15
    },
    icon: {
      display: 'flex',
      alignItems: 'center'
    },
    links: {
      position: 'relative',
      flex: 1,
      overflow: 'hidden'
    },
    linksStripe: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      height: '100%',
      overflow: 'hidden',
      minWidth: '100%'
    },
    linksShadow: {
      position: 'absolute',
      left: 0,
      width: 15,
      height: '100%',
      background: 'linear-gradient(90deg, rgb(252, 252, 252), rgba(252, 252, 252, 0))'
    },
    fontIcon: {
      fontSize: 26,
      color: Colors.blue500,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    }
  };

  const handleFontIconClick = () => moveDirectoryUp(directoryDepth);

  const renderLinks = () => (
    _.map(previousFolders, (folderName, index) => {
      const step = directoryDepth - index - 1;
      const handleDirectoryNavigationLinkClick = () => moveDirectoryUp(step);

      return (
        <DirectoryNavigationLink
          key={index}
          label={folderName}
          sideLettersCount={8}
          onClick={handleDirectoryNavigationLinkClick}
        />
      );
    })
  );

  return (
    <div style={styles.root}>
      <div style={styles.icon}>
        <FontIcon
          className="synicon-folder-outline"
          style={styles.fontIcon}
          onClick={handleFontIconClick}
        />
      </div>
      <div style={styles.links}>
        <div style={styles.linksStripe}>
          {renderLinks()}
        </div>
        <div style={styles.linksShadow} />
      </div>
    </div>
  );
};

export default DirectoryNavigation;
