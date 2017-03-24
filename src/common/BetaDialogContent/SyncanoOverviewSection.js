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
          <img src={require('../../assets/img/features/socket.svg')} alt="socket icon" />
          <h2 style={styles.title}>Socket Registry</h2>
          <p style={styles.description}>
            150 publicly ready to use Sockets containing backend functions and integrations created by the community.
          </p>
        </div>
        <div style={styles.box}>
          <img src={require('../../assets/img/features/sockets.svg')} alt="sockets icon" />
          <h2 style={styles.title}>Custom Sockets</h2>
          <p style={styles.description}>
            Create your own Syncano Sockets and store them in your private Socket Registry or contribute to the Public
            Socket Registry.
          </p>
        </div>
      </div>
      <div style={styles.rowContainer}>
        <div style={styles.box}>
          <img src={require('../../assets/img/features/terminal.svg')} alt="terminal icon" />
          <h2 style={styles.title}>Powerful CLI</h2>
          <p style={styles.description}>
            Forget about the deployment process; Build, deploy, tweak, redeploy.. in seconds. The CLI is your gateway to
            be 100% serverless.
          </p>
        </div>
        <div style={styles.box}>
          <img src={require('../../assets/img/features/hosting.svg')} alt="hosting icon" />
          <h2 style={styles.title}>Web Hosting</h2>
          <p style={styles.description}>
              Deploy SSL secured web pages a in a single command from the CLI.
          </p>
        </div>
      </div>
      <div style={styles.rowContainer}>
        <div style={styles.box}>
          <img src={require('../../assets/img/features/database.svg')} alt="database icon" />
          <h2 style={styles.title}>Realtime storage</h2>
          <p style={styles.description}>
            Store any object in the built-in NoSQL DB. No schema migrations and instant notification on changes to the
            stored data.
          </p>
        </div>
        <div style={styles.box}>
          <img src={require('../../assets/img/features/users.svg')} alt="users icon" />
          <h2 style={styles.title}>Developer Hub</h2>
          <p style={styles.description}>
            With the Syncano Developer Hub, you can increase your development capacity with the muscle of thousands of
            software developers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SyncanoOverviewSection;
