import React from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { LinkWithIcon } from '../../common';

const HostingListItemLinks = ({ hostingLabel, items, isDefault, params }) => {
  const styles = {
    item: {
      padding: '4px 0'
    }
  };

  const getLinkUrl = (domain) => {
    if (domain === 'default' && isDefault) {
      return `https://${params.instanceName}.syncano.site`;
    }

    if (domain === hostingLabel) {
      return `https://${domain}--${params.instanceName}.syncano.site`;
    }

    return domain;
  };

  return (
    <div>
      {_.map(items, (item) => (
        <div
          style={styles.item}
          key={`domain-${item}`}
        >
          <LinkWithIcon url={getLinkUrl(item)} />
        </div>
      ))}
    </div>
  );
};

export default withRouter(HostingListItemLinks);
