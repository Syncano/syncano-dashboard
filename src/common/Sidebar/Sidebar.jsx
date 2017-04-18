import React from 'react';
import Radium from 'radium';
import SidebarContent from './SidebarContent';

export default Radium(React.createClass({
  displayName: 'Sidebar',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getStyles() {
    return {
      root: {
        width: 256,
        flex: '0 0 256px',
        zIndex: 11
      },
      background: {
        background: '#F0F1F5',
        position: 'fixed',
        zIndex: '-1',
        width: 256,
        height: '100%',
        left: 0,
        top: 0,
        borderRight: '1px solid #D8D8D8'
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const { children, style, contentStyle, backgroundStyle, ...other } = this.props;

    return (
      <div
        className="left-nav"
        style={{ ...style, ...styles.root }}
        {...other}
      >
        <div style={{ ...styles.background, ...backgroundStyle }} />
        <SidebarContent style={contentStyle}>
          {children}
        </SidebarContent>
      </div>
    );
  }
}));
