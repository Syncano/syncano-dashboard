import React from 'react';
import { colors as Colors } from 'material-ui/styles/';
import SocketWrapper from './SocketWrapper';

export default React.createClass({
  displayName: 'TriggerSocket',

  getDefaultProps() {
    return {
      tooltip: 'Create a Trigger Socket'
    };
  },

  getStyles() {
    return {
      iconStyle: {
        color: Colors.amberA200
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const {
      style,
      iconStyle,
      ...other
      } = this.props;

    return (
      <SocketWrapper
        {...other}
        iconClassName="synicon-socket-trigger"
        style={style}
        iconStyle={{ ...styles.iconStyle, ...iconStyle }}
      />
    );
  }
});
