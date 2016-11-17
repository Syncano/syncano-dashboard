import React from 'react';

import { Toolbar } from 'material-ui';

const SocketsSearchBar = React.createClass({

  getStyles() {
    return {
      toolbar: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: '100%',
        minHeight: '13vh',
        background: '#444444'
      },
      input: {
        alignSelf: 'center',
        minWidth: '70%',
        height: '50%',
        padding: 20,
        fontSize: 20,
        marginLeft: '2%',
        outline: 'none'
      },
      logo: {
        alignSelf: 'center',
        height: '70%'
      },
      toolbarContent: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: '60%',
        position: 'relative',
        right: '5%'
      },
      text: {
        color: '#509ccc',
        fontSize: '3vh',
        lineHeight: '3vh',
        alignSelf: 'center',
        marginRight: 10
      }
    };
  },

  render() {
    const { term, handleChangeSearchTerm, onClick } = this.props;
    const styles = this.getStyles();
    const socketImageDir = '/img/socket-logo.svg';

    return (
      <Toolbar
        style={styles.toolbar}
      >
        <div style={styles.toolbarContent}>
          <span style={styles.text}>
            sockets <br />
            registry
          </span>
          <img
            alt="logo"
            src={socketImageDir}
            style={styles.logo}
          />
          <input
            style={styles.input}
            type="text"
            value={term}
            onClick={onClick}
            onChange={handleChangeSearchTerm}
            placeholder="Search..."
          />
        </div>
      </Toolbar>
    );
  }
});

export default SocketsSearchBar;
