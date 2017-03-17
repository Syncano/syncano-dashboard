import React, { Component } from 'react';

import SyncanoOverviewSection from './SyncanoOverviewSection';
import PromoteSyncanoSection from './PromoteSyncanoSection';

class BetaDialogContent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getStyles = () => ({
    root: {
      display: 'flex'
    },
    promoteSyncanoSection: {
      width: '40%',
      padding: '40px 60px'
    },
    syncanoOverviewSection: {
      width: '60%',
      padding: '0 30px',
      backgroundColor: '#0B0F16'
    }
  })

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <div style={styles.promoteSyncanoSection}>
          <PromoteSyncanoSection />
        </div>
        <div style={styles.syncanoOverviewSection}>
          <SyncanoOverviewSection />
        </div>
      </div>
    );
  }
}

export default BetaDialogContent;
