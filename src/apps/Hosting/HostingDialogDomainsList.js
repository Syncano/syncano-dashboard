import React, { Component } from 'react';
import _ from 'lodash';

import HostingDialogDomainRow from './HostingDialogDomainRow';

class HostingDialogDomainsList extends Component {
  componentDidUpdate(prevProps) {
    const areDomainsInPrevProps = prevProps.domains && prevProps.domains.length;
    const areDomainsInProps = this.props.domains && this.props.domains.length;

    if (areDomainsInPrevProps < areDomainsInProps) {
      this.refs.hostingDialogDomainsList.scrollIntoView(false);
    }
  }

  renderItems = () => {
    const { domains, handleAddNewDomain, handleChangeDomains, handleRemoveDomain } = this.props;
    const items = _.map((domains), (domain, index) => {
      const handleChangeCurrentDomain = (event, value) => handleChangeDomains(value, index);

      return domain.value !== 'default' && (
        <HostingDialogDomainRow
          key={domain.id}
          domain={domain.value}
          handleAddNewDomain={handleAddNewDomain}
          handleChangeCurrentDomain={handleChangeCurrentDomain}
          handleRemoveDomain={handleRemoveDomain}
        />
      );
    });

    return items;
  }

  render() {
    return (
      <div ref="hostingDialogDomainsList">
        {this.renderItems()}
      </div>
    );
  }
}

export default HostingDialogDomainsList;
