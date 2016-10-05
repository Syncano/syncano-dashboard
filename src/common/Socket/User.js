import React from 'react';
import { colors as Colors } from 'material-ui/styles/';
import SocketWrapper from './SocketWrapper';

export default React.createClass({
  displayName: 'UserSocket',

  getDefaultProps() {
    return {
      tooltip: 'Create an User'
    };
  },

  getStyles() {
    return {
      iconStyle: {
        color: Colors.deepPurple300
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
        iconClassName="synicon-socket-user"
        style={style}
        iconStyle={{ ...styles.iconStyle, ...iconStyle }}
      />
    );
  }
});
