import _ from 'lodash';

export default {
  sortHostingDomains(domains, label, isDefault) {
    // cname(s) -> default -> label
    const cnameArray = _.without(domains, 'default', label);
    const sortedDomains = [...cnameArray];

    if (_.isEmpty(sortedDomains) && /\.[a-zA-Z]+$/.test(label)) {
      sortedDomains.push(label);
    }
    if (isDefault) {
      sortedDomains.push('default');
    }

    sortedDomains.push(label);

    return sortedDomains;
  },

  prepareHosting(hosting) {
    hosting.domains = this.sortHostingDomains(hosting.domains, hosting.name, hosting.is_default);
    hosting.cnameIndex = _.findIndex(hosting.domains, (domain) => {
      const isDefaultDomain = domain === 'default';
      const isNameDomain = domain === hosting.name;
      const isValidDomain = /\.[a-zA-Z]+$/.test(domain);

      return !isDefaultDomain && !isNameDomain || isValidDomain;
    });
    return hosting;
  }
};
