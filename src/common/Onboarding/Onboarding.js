import React, { Component } from 'react';

import Terminal from './OnboardingTerminal';
import { URLS } from '../../constants/Constants';

class Onboarding extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getStyles = () => ({
    welcomeText: {
      width: '100%',
      padding: '60px 60px 10px 60px',
      fontWeight: 100,
      textAlign: 'center'
    },
    footerText: {
      fontSize: '20px',
      textAlign: 'center',
      fontWeight: 100
    },
    secondaryText: {
      textAlign: 'center',
      fontSize: '20px'
    }
  })

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <div style={styles.welcomeText}>
          <h4>Glad to see you! 👋</h4>
        </div>
        <div>
          <div style={styles.secondaryText}>
             To start using Syncano, you&apos;ll need to install&nbsp;
             <a target="_blank" href="https://nodejs.org">Node</a>
             , go to your terminal, and:
          </div>
          <div style={styles.terminal}>
            <Terminal />
          </div>
          <div style={styles.footerText}>
            See the
            <a
              target="_blank"
              href={URLS['docs-quickstart']}
            >
              &nbsp;Quickstart Guide&nbsp;
            </a>
            or catch us on
            <a target="_blank" href={URLS['slack-invite']}> Slack </a>
            if you&#39;d like us to assist you.
          </div>
        </div>
      </div>
    );
  }
}

export default Onboarding;
