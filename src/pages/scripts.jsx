import React from 'react';
import ScriptsActions from '../apps/Scripts/ScriptsActions';

export default React.createClass({
  displayName: 'ScriptsPage',

  componentDidMount() {
    console.debug('ScriptsPage::componentDidMount');
    ScriptsActions.fetch();
  },

  render() {
    return this.props.children;
  }
});
