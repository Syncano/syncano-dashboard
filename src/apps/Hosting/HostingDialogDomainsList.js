import React from 'react';
import _ from 'lodash';

import HostingDialogDomainRow from './HostingDialogDomainRow';

const HostingDialogDomainsList = React.createClass({
  componentDidUpdate(prevProps) {
    const areDomainsInPrevProps = prevProps.domains && prevProps.domains.length;
    const areDomainsInProps = this.props.domains && this.props.domains.length;

    if (areDomainsInPrevProps < areDomainsInProps) {
      this.refs.hostingDialogDomainsList.scrollIntoView(false);
    }
  },

  getInitialState() {
    return {
      inputsFocused: {}
    };
  },

  handleInputFocus(domainId) {
    const { inputsFocused } = this.state;

    inputsFocused[domainId] = true;
    this.setState({ inputsFocused });
  },

  renderItems() {
    const { domains, handleAddNewDomain, handleChangeDomains, handleRemoveDomain, isDefault } = this.props;
    const { inputsFocused } = this.state;

    const items = _.map((domains), (domain, index) => {
      const handleChangeCurrentDomain = (event, value) => handleChangeDomains(value, index);
      const handleInputFocus = () => this.handleInputFocus(domain.id);
      const isInputFocused = _.has(inputsFocused, domain.id);
      const displayDefaultDomain = !isDefault || domain.value !== 'default' || isInputFocused;

      return displayDefaultDomain && (
        <HostingDialogDomainRow
          key={domain.id}
          domain={domain.value}
          handleAddNewDomain={handleAddNewDomain}
          handleChangeCurrentDomain={handleChangeCurrentDomain}
          handleInputFocus={handleInputFocus}
          handleRemoveDomain={handleRemoveDomain}
        />
      );
    });

    return items;
  },

  render() {
    return (
      <div ref="hostingDialogDomainsList">
        {this.renderItems()}
      </div>
    );
  }
});

export default HostingDialogDomainsList;
