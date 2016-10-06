import React from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { colors as Colors } from 'material-ui/styles/';

import { LinkWithIcon } from '../../common';

const HostingListItemLinks = ({ isVisible, params, isDefaultHosting, domains }) => {
  const styles = {
    base: {
      minWidth: '100%',
      backgroundColor: Colors.grey100,
      borderRight: '1px solid #DDD',
      borderLeft: '1px solid #DDD',
      color: '#9B9B9B'
    },
    linksVisible: {
      maxHeight: '500px',
      transition: 'max-height 450ms ease-in',
      overflow: 'auto',
      borderBottom: '1px solid #DDD'
    },
    linksHidden: {
      maxHeight: 0,
      overflow: 'hidden',
      transition: 'max-height 450ms ease-out'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: 20
    }
  };
  const renderHostingLinks = () => {
    const { instanceName } = params;
    const linksItems = _.map(domains, domain => {
      const linkBase = isDefaultHosting ? instanceName : `${instanceName}--${domain}`;

      return (
        <div key={`domain-${domain}`}>
          <LinkWithIcon url={`http://${linkBase}.syncano.site`} />
        </div>
      );
    });

    return linksItems;
  };

  let currentStyles = { ...styles.base, ...styles.linksHidden };

  if (isVisible) {
    currentStyles = { ...currentStyles, ...styles.linksVisible };
  }

  return (
    <div style={currentStyles}>
      <div style={styles.container}>
        {renderHostingLinks()}
      </div>
    </div>
  );
};

export default withRouter(HostingListItemLinks);
