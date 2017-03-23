import React from 'react';

import SyncanoOverviewSection from './SyncanoOverviewSection';
import PromoteSyncanoSection from './PromoteSyncanoSection';

const BetaDialogContent = () => {
  const styles = {
    root: {
      display: 'flex'
    },
    promoteSyncanoSection: {
      width: '40%',
      padding: '40px 60px'
    },
    syncanoOverviewSection: {
      width: '60%',
      padding: '40px 30px',
      backgroundColor: '#0B0F16'
    }
  };

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
};

export default BetaDialogContent;
