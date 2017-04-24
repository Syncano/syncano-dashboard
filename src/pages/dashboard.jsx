import React, { PropTypes } from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';

import SessionStore from '../apps/Session/SessionStore';
import ProfileBillingPlanStore from '../apps/Profile/ProfileBillingPlanStore';
import RuntimeActions from '../apps/Runtimes/RuntimesActions';

import { Header, UpgradeNowToolbar } from '../common/';
import InstanceDialog from '../apps/Instances/InstanceDialog';

const Dashboard = React.createClass({
  contextTypes: {
    location: PropTypes.object
  },

  mixins: [Reflux.connect(ProfileBillingPlanStore, 'billing')],

  componentDidMount() {
    const { router } = this.props;
    const { location } = this.context;

    if (SessionStore.getSignUpMode()) {
      router.push({
        pathname: '/setup/',
        query: location.query
      });
    }

    ProfileBillingPlanStore.init();
    RuntimeActions.fetch();
  },

  componentWillUnmount() {
    ProfileBillingPlanStore.clearData();
  },

  getStyles() {
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }
    };
  },

  renderUpgradeToolbar() {
    const plan = ProfileBillingPlanStore.getPlan();
    const endDate = ProfileBillingPlanStore.getActiveSubscriptionEndDate();

    if (plan !== 'builder') {
      return null;
    }

    return <UpgradeNowToolbar subscriptionEndDate={endDate} />;
  },

  render() {
    const styles = this.getStyles();
    const { children } = this.props;

    return (
      <div style={styles.root}>
        <div style={styles.content}>
          <Header />
          {children}
        </div>
        {this.renderUpgradeToolbar()}
        <InstanceDialog />
      </div>
    );
  }
});

export default withRouter(Dashboard);
