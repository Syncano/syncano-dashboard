import React from 'react';
import { colors as Colors } from 'material-ui/styles/';
import SocketWrapper from './SocketWrapper';

export default React.createClass({
  displayName: 'ChannelSocket',

  getDefaultProps() {
    return {
      tooltipPosition: 'bottom-left',
      iconClassName: 'synicon-plus-circle-outline'
    };
  },

  getStyles() {
    return {
      iconStyle: {
        color: Colors.blue400
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const {
      style,
      iconStyle,
      iconClassName,
      ...other
      } = this.props;

    return (
      <SocketWrapper
        {...other}
        iconClassName={iconClassName}
        style={style}
        iconStyle={{ ...styles.iconStyle, ...iconStyle }}
      />
    );
  }
});
