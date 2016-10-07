import React, { Component } from 'react';
import _ from 'lodash';

import HostingDialogDomainRow from './HostingDialogDomainRow';

class HostingDialogDomainsList extends Component {
  /* eslint-disable no-useless-constructor */
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.domains.length < this.props.domains.length) {
      this.refs.hostingDialogDomainsList.scrollIntoView(false);
    }
  }

  renderItems = () => {
    const { domains, handleAddNewDomain, handleChangeDomains, handleRemoveDomain } = this.props;
    const items = _.map((domains), (domain, index) => {
      const handleChangeCurrentDomain = (event, value) => handleChangeDomains(value, index);

      return (
        <HostingDialogDomainRow
          key={index}
          domain={domain}
          handleAddNewDomain={handleAddNewDomain}
          handleChangeCurrentDomain={handleChangeCurrentDomain}
          handleRemoveDomain={handleRemoveDomain}
        />
      );
    });

    return items;
  }

  render = () => (
    <div ref="hostingDialogDomainsList">
      {this.renderItems()}
    </div>
  );
}

export default HostingDialogDomainsList;
