import React from 'react';
import _ from 'lodash';

import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

const DirectoryNavigationLink = ({ label, sideLettersCount, onClick }) => {
  const styles = {
    root: {
      marginLeft: 10,
      display: 'flex'
    },
    icon: {
      marginRight: 10,
      display: 'flex',
      alignItems: 'center'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 16,
      color: Colors.blue500,
      cursor: 'pointer'
    },
    fontIcon: {
      fontSize: 18,
      display: 'flex',
      alignItems: 'center',
      color: 'rgba(0, 0, 0, .4)'
    }
  };

  const truncateLabel = (text) => {
    if (text.length > sideLettersCount * 2) {
      const left = _.take(text, sideLettersCount).join('');
      const right = _.takeRight(text, sideLettersCount).join('');

      return `${left}...${right}`;
    }

    return text;
  };

  return (
    <div style={styles.root}>
      <div style={styles.icon}>
        <FontIcon
          className="synicon-chevron-right"
          style={styles.fontIcon}
        />
      </div>
      <div
        style={styles.label}
        title={label}
        onClick={onClick}
      >
        {truncateLabel(label)}
      </div>
    </div>
  );
};

export default DirectoryNavigationLink;
