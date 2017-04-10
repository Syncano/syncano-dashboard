import React from 'react';

const Terminal = () => {
  const styles = {
    hero: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-around',
      position: 'relative'
    },
    terminal: {
      width: '100%',
      margin: '20px auto',
      minWidth: '600px',
      background: '#fff',
      borderRadius: '5px',
      overflow: 'hidden'
    },
    toolbar: {
      width: '100%',
      height: '25px',
      background: '#0B0F15',
      borderRadius: '5px 5px 0 0'
    },
    lights: {
      float: 'left',
      position: 'relative',
      top: '14px',
      left: '14px'
    },
    light: {
      float: 'left',
      width: '14px',
      height: '14px',
      borderRadius: '14px',
      overflow: 'hidden'
    },
    red: {
      background: '#FF5F56'
    },
    yellow: {
      background: '#FFBD2E',
      margin: '0px 10px'
    },
    green: {
      background: '#27C93F'
    },
    title: {
      float: 'left',
      position: 'relative',
      top: '14px',
      width: '40%',
      left: '38%',
      fontFamily: `"Myriad Pro", sans-serif`,
      fontSize: '16px',
      lineHeight: '14px',
      color: '#888888'
    },
    terminalText: {
      fontFamily: `"Lucida Console", Monaco, monospace`,
      fontSize: '13px',
      fonstWeight: '100',
      float: 'left',
      width: '100%',
      minHeight: '130px',
      background: '#0B0F15',
      padding: '24px 15px',
      lineHeight: '1.65em'
    },
    terminalTextP: {
      color: '#f1f1f1',
      marginTop: '5px',
      marginBottom: '5px',
      textAlign: 'left'
    },
    terminalTextPath: {
      color: '#5D5D5D'
    },
    cliOutput: {
      marginLeft: '24px',
      color: '#f1f1f1'
    },
    cursor: {
      background: '#f1f1f1',
      display: 'inline-block',
      width: '11px',
      height: '19px',
      marginBottom: '-3px'
    }
  };

  return (
    <div style={styles.hero}>
      <div>
        <div style={styles.terminal}>
          <div style={styles.toolbar}>
            <div>
              <div style={styles.lights}>
                <div style={{ ...styles.light, ...styles.red }} />
                <div style={{ ...styles.light, ...styles.yellow }} />
                <div style={{ ...styles.light, ...styles.green }} />
              </div>
              <div style={styles.title}>
                shell
              </div>
            </div>
          </div>
          <div style={styles.terminalText}>
            <div style={styles.terminalTextP}>
              ⬢
              <span style={styles.terminalTextPath}> &#126;&#47;awesome-project </ span>
              npm install -g yarn <br />
            </div>
            <div style={styles.terminalTextP}>
              ⬢
              <span style={styles.terminalTextPath}> &#126;&#47;awesome-project </span>
              npm install -g syncano-cli <br />
            </div>
            <div style={styles.terminalTextP}>
              ⬢
              <span style={styles.terminalTextPath}> &#126;&#47;awesome-project </span>
              syncano-cli init
            </div>
            <div style={styles.cliOutput}>
              ...<br />
              &#62; Creating Syncano Instance... Done<br />
              &#62; Syncano Instance crimson-fire-6113 has been created!<br />
              &#62; Your project is attached to crimson-fire-6113 instance now!<br />
              &#62; Project has been created.
            </div>
            <div style={styles.terminalTextP}>
              ⬢
              <span style={styles.terminalTextPath}> &#126;&#47;awesome-project </span>
              <span style={styles.cursor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
