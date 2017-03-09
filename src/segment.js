import analytics from 'analyticsjs';

if (APP_CONFIG.ANALYTICS_WRITE_KEY) {
  analytics.load(APP_CONFIG.ANALYTICS_WRITE_KEY);
  analytics.page('Dashboard', {
    Init: true
  });
}

export default analytics;
