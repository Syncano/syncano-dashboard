import React from 'react';
import TemplatesActions from '../apps/Templates/TemplatesActions';

export default React.createClass({
  displayName: 'TemplatesPage',

  componentDidMount() {
    console.debug('TemplatesPage::componentDidMount');
    TemplatesActions.fetch();
  },

  render() {
    return this.props.children;
  }
});
