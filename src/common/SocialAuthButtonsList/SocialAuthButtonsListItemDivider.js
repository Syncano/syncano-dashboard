import React from 'react';
import { Divider } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'SocialAuthButtonsListItemDivider',

  getStyles() {
    return {
      backgroundColor: Colors.blue700
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <Divider style={styles} />
    );
  }
});
