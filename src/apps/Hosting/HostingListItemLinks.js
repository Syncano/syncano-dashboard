import React from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { LinkWithIcon } from '../../common';

const HostingListItemLinks = ({ items, params }) => {
  const styles = {
    item: {
      padding: '4px 0'
    }
  };

  const getLinkUrl = (domain) => {
    const containsOnlyLetter = /^[a-zA-Z]+$/;

    if (domain === 'default') {
      return `https://${params.instanceName}.syncano.site`;
    }

    if (containsOnlyLetter.test(domain)) {
      return `https://${params.instanceName}--${domain}.syncano.site`;
    }

    return domain;
  };

  return (
    <div>
      {_.map(items, (item) => <div style={styles.item}><LinkWithIcon url={getLinkUrl(item)} /></div>)}
    </div>
  );
};

export default withRouter(HostingListItemLinks);
