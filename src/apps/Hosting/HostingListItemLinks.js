import React from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import shortid from 'shortid';
import { LinkWithIcon } from '../../common';

const HostingListItemLinks = ({ items, isDefault, params }) => {
  const styles = {
    item: {
      padding: '4px 0'
    }
  };
  let isCnameFound = false;

  const getLinkUrl = (domain) => {
    const isValidCname = /\.[a-zA-Z]+$/.test(domain);

    if (domain === 'default' && isDefault) {
      return `https://${params.instanceName}.syncano.site`;
    }

    if (!isCnameFound && isValidCname) {
      isCnameFound = true;
      return domain;
    }

    return `https://${domain}--${params.instanceName}.syncano.site`;
  };

  return (
    <div>
      {_.map(items, (item) => (
        <div
          style={styles.item}
          key={`domain-${item}-${shortid.generate()}`}
        >
          <LinkWithIcon url={getLinkUrl(item)} />
        </div>
      ))}
    </div>
  );
};

export default withRouter(HostingListItemLinks);
