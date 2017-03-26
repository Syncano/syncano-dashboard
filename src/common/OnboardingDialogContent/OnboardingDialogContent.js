import React, { Component } from 'react';

import HeaderSection from './HeaderSection';
import Terminal from './OnboardingDialogTerminal';

class OnboardingDialogContent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getStyles = () => ({
    promoteSyncanoSection: {
      width: '100%',
      padding: '40px 60px 10px 60px',
      fontWeight: 100
    },
    footerText: {
      fontSize: '20px',
      paddingTop: 20,
      paddingBottom: 60,
      textAlign: 'center',
      fontWeight: 100
    }
  })

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <div style={styles.promoteSyncanoSection}>
          <HeaderSection />
        </div>
        <div style={styles.terminal}>
          <Terminal />
        </div>
        <div style={styles.footerText}>
          See our
          <a target="_blank" href="https://syncano.github.io/syncano-node-cli/"> Quickstart Guide </a>
          or catch us on
          <a target="_blank" href="https://www.syncano.io/slack-invite/"> Slack </a>
          if you&#39;d like us to assist you.
        </div>
      </div>
    );
  }
}

export default OnboardingDialogContent;
