import React from 'react';

const SyncanoOverviewSection = () => {
  const styles = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%'
    },
    rowContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    box: {
      width: '48%'
    },
    title: {
      color: '#ffffff',
      fontSize: 22,
      fontWeight: 400,
      margin: '20px 0'
    },
    description: {
      color: '#838484',
      fontSize: 18,
      lineHeight: '25px'
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.rowContainer}>
        <div style={styles.box}>
          <img src={require('../../assets/img/features/socket.svg')} alt="" />
          <h2 style={styles.title}>Custom Sockets</h2>
          <p style={styles.description}>
            Reusable building blocks for a backend development
          </p>
        </div>
        <div style={styles.box}>
          <img src={require('../../assets/img/features/sockets.svg')} alt="" />
          <h2 style={styles.title}>Private Sockets registry</h2>
          <p style={styles.description}>
            Store with thounsends of backend solutions
          </p>
        </div>
      </div>
      <div style={styles.rowContainer}>
        <div style={styles.box}>
          <img src={require('../../assets/img/features/terminal.svg')} alt="" />
          <h2 style={styles.title}>Powerful CLI</h2>
          <p style={styles.description}>
            Tight interation with developer enviroment to control whole process of building server-side like front-end
          </p>
        </div>
        <div style={styles.box}>
          <img src={require('../../assets/img/features/hosting.svg')} alt="" />
          <h2 style={styles.title}>Hosting</h2>
          <p style={styles.description}>
            Fast and secure static hosting for your web app (free SSL certificate included!)
          </p>
        </div>
      </div>
      <div style={styles.rowContainer}>
        <div style={styles.box}>
          <img src={require('../../assets/img/features/database.svg')} alt="" />
          <h2 style={styles.title}>NoSQL realtime database</h2>
          <p style={styles.description}>
            Store and sync data with NoSQL highly scalable database
          </p>
        </div>
        <div style={styles.box}>
          <img src={require('../../assets/img/features/users.svg')} alt="" />
          <h2 style={styles.title}>User Management</h2>
          <p style={styles.description}>
            Store users, identity authenticate user with password or using identity providers like Facebook or Twitter
          </p>
        </div>
      </div>
    </div>
  );
};

export default SyncanoOverviewSection;
