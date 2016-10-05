import React from 'react';
import _ from 'lodash';

import DialogMixin from '../../mixins/DialogMixin';
import { Dialog } from 'material-ui';

export default React.createClass({
  displayName: 'Dialog',

  mixins: [DialogMixin],

  getStyles() {
    return {
      root: {
        overflow: 'auto',
        paddingBottom: 64
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const { children, style, open, ...other } = this.props;
    const dialogStyle = { ...styles.root, ...style };

    return (
      <Dialog
        {...other}
        open={_.isBoolean(open) ? open : this.state.open}
        style={dialogStyle}
        autoDetectWindowHeight={false}
      >
        {children}
      </Dialog>
    );
  }
});
