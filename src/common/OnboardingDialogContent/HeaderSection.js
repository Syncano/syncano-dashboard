import React, { Component } from 'react';

import { Logo } from '../';

class HeaderSection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getStyles = () => ({
    ribbonBackground: {
      width: 125,
      height: 30,
      backgroundColor: 'red',
      transform: 'rotate(-45deg)',
      position: 'absolute',
      top: 15,
      left: -30,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      letterSpacing: 1
    },
    root: {
      fontSize: 20,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'space-around',
      height: '100%'
    },
    flexColumn: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%'
    },
    logo: {
      width: '30%',
      marginTop: 25,
      marginBottom: 50
    }
  })

  renderBetaRibbon() {
    const styles = this.getStyles();

    return (
      <div style={styles.ribbonBackground}>
        Beta
      </div>
    );
  }

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        {this.renderBetaRibbon()}
        <header style={styles.flexColumn}>
          <Logo
            className="logo-black"
            style={styles.logo}
          />
          <div>
            Glad to see you! To start using Syncano, you&apos;ll need to go to your terminal and:
          </div>
        </header>
      </div>
    );
  }
}

export default HeaderSection;
