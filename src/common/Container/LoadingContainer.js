import React from 'react';
import Radium from 'radium';

export default Radium(React.createClass({
  displayName: 'LoadingContainer',

  getStyles() {
    return {
      container: {
        margin: '96px auto'
      },
      withSidebar: {
        marginLeft: 300
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const { withSidebar, children } = this.props;

    return (
      <div
        style={[
          styles.container,
          withSidebar === true && styles.withSidebar
        ]}
      >
        {children}
      </div>
    );
  }
}));
