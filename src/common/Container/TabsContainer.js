import React from 'react';
import Container from './Container';

export default React.createClass({
  displayName: 'TabsContainer',

  getStyles() {
    return {
      maxWidth: '1000px',
      margin: '0 auto'
    };
  },

  render() {
    const styles = this.getStyles();
    const { tabs, children } = this.props;

    return (
      <Container style={styles}>
        <div className="vm-4-b">
          {tabs}
        </div>
        {children}
      </Container>
    );
  }
});
