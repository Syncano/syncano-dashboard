import React from 'react';
import { colors as Colors } from 'material-ui/styles/';
import SocketWrapper from './SocketWrapper';

export default React.createClass({
  displayName: 'ScheduleSocket',

  getDefaultProps() {
    return {
      tooltip: 'Create a Schedule Socket'
    };
  },

  getStyles() {
    return {
      iconStyle: {
        color: Colors.lime400
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
        iconClassName="synicon-socket-schedule"
        style={style}
        iconStyle={{ ...styles.iconStyle, ...iconStyle }}
      />
    );
  }
});
