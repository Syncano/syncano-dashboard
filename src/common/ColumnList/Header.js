import React from 'react';
import Radium from 'radium';

export default Radium(React.createClass({
  displayName: 'Header',

  getStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      lineHeight: '24px',
      color: 'rgba(0,0,0,.54)',
      marginBottom: 16
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );
  }
}));
