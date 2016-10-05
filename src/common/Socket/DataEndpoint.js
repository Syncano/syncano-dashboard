import React from 'react';
import { colors as Colors } from 'material-ui/styles/';
import SocketWrapper from './SocketWrapper';

export default React.createClass({
  displayName: 'DataSocket',

  getDefaultProps() {
    return {
      tooltip: 'Create a Data Endpoint'
    };
  },

  getStyles() {
    return {
      iconStyle: {
        color: Colors.green400
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
        iconClassName="synicon-socket-data"
        style={style}
        iconStyle={{ ...styles.iconStyle, ...iconStyle }}
      />
    );
  }
});
