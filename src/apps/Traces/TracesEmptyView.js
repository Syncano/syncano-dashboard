import React from 'react';
import { FontIcon } from 'material-ui';

const TracesEmptyView = ({ tracesFor }) => {
  const styles = {
    noTracesContainer: {
      padding: '96px 0',
      textAlign: 'center'
    },
    noTracesIcon: {
      fontSize: 96,
      lineHeight: 1,
      marginBottom: 16,
      color: 'rgba(0, 0, 0, 0.24)'
    },
    noTracesText: {
      color: 'rgba(0, 0, 0, 0.67)',
      fontSize: 34,
      margin: 0
    }
  };

  const tracesForConfig = {
    script: {
      name: 'Script',
      icon: 'synicon-package-variant'
    },
    scriptEndpoint: {
      name: 'Script Endpoint',
      icon: 'synicon-arrow-up-bold'
    },
    trigger: {
      name: 'Trigger',
      icon: 'synicon-arrow-up-bold'
    },
    schedule: {
      name: 'Schedule',
      icon: 'synicon-camera-timer'
    }
  };

  return (
    <div style={styles.noTracesContainer}>
      <FontIcon
        style={styles.noTracesIcon}
        className={tracesForConfig[tracesFor].icon}
      />
      <p style={styles.noTracesText}>There are no traces for this {tracesForConfig[tracesFor].name} yet</p>
    </div>
  );
};

export default TracesEmptyView;
