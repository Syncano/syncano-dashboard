import React from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { LinkWithIcon } from '../../common';

const HostingListItemLinks = ({ items, isDefault, params }) => {
  const styles = {
    item: {
      padding: '4px 0'
    }
  };
  let isCnameFounded = false;

  const getLinkUrl = (domain) => {
    const isValidCname = /\.[a-zA-Z]+$/.test(domain);

    if (domain === 'default' && isDefault) {
      return `https://${params.instanceName}.syncano.site`;
    }

    if (!isCnameFounded && isValidCname) {
      isCnameFounded = true;
      return domain;
    }

    return `https://${domain}--${params.instanceName}.syncano.site`;
  };

  return (
    <div>
      {_.map(items, (item, index) => (
        <div
          style={styles.item}
          key={`domain-${item}-${index}`}
        >
          <LinkWithIcon url={getLinkUrl(item)} />
        </div>
      ))}
    </div>
  );
};

export default withRouter(HostingListItemLinks);
