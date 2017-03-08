import React from 'react';
import { Container } from '../../common';

const SocketsSearchBar = ({ value, onInputChange }) => {
  const getStyles = () => ({
    root: {
      background: '#f3f3f3'
    },
    inner: {
      maxWidth: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 20
    },
    logo: {
      flex: '0 0 250px',
      display: 'flex',
      alignItems: 'center'
    },
    logoTitle: {
      whiteSpace: 'nowrap',
      color: '#509ccc',
      fontSize: 30,
      lineHeight: '1em'
    },
    logoImg: {
      display: 'block',
      height: 80,
      marginLeft: 30
    },
    search: {
      flex: 1
    },
    searchInput: {
      width: '100%',
      height: 50,
      padding: '10px 15px',
      fontSize: 16,
      border: '1px solid rgba(0, 0, 0, .4)',
      outline: 'none'
    }
  });

  const styles = getStyles();

  return (
    <div style={styles.root}>
      <Container style={styles.inner}>
        <div style={styles.logo}>
          <div style={styles.logoTitle}>
            Sockets<br />Registry
          </div>
          <img
            src={'/img/socket-logo.svg'}
            alt="Sockets Registry logo"
            style={styles.logoImg}
          />
        </div>
        <div style={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            value={value}
            style={styles.searchInput}
            onChange={onInputChange}
          />
        </div>
      </Container>
    </div>
  );
};

export default SocketsSearchBar;
