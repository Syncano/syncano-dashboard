import React from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { colors as Colors } from 'material-ui/styles/';

import { LinkWithIcon } from '../../common';

const HostingListItemLinks = ({ isVisible, params, domains }) => {
  const styles = {
    base: {
      width: '100%',
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
      minWidth: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      padding: 20
    },
    linkItem: {
      display: 'flex',
      alignSelf: 'flex-start',
      padding: '0 0 16px 16px',
      width: '50%'
    },
    linkBorderStyles: {
      borderRight: `1px solid ${Colors.grey300}`,
      paddingRight: 16,
      paddingLeft: 0
    }
  };
  const renderHostingLinks = () => {
    const { instanceName } = params;
    const domainsToDisplay = _.reject(domains, { value: 'default' });
    const linksItems = _.map(domainsToDisplay, (domain, index) => {
      const linkBase = `${instanceName}--${domain.value}`;
      const hasBorder = domainsToDisplay.length > 1 && index % 2 === 0;
      const linkStyles = hasBorder ? { ...styles.linkItem, ...styles.linkBorderStyles } : styles.linkItem;

      return (
        <div
          style={linkStyles}
          key={`domain-${domain.id || domain}`}
        >
          <LinkWithIcon url={`https://${linkBase}.syncano.site`} />
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
