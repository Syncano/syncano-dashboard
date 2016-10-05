import React from 'react';
import Radium from 'radium';

export default Radium(React.createClass({

  displayName: 'ItemColumn',

  getStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
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
