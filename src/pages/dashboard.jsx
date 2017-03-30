import React, { PropTypes } from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';

import SessionStore from '../apps/Session/SessionStore';
import ProfileBillingPlanStore from '../apps/Profile/ProfileBillingPlanStore';
import InstancesStore from '../apps/Instances/InstancesStore';

import { Header, UpgradeNowToolbar } from '../common/';
import InstanceDialog from '../apps/Instances/InstanceDialog';
import BlurPageDialog from '../common/Dialog/BlurPageDialog';
import OnboardingDialogContent from '../common/OnboardingDialogContent/OnboardingDialogContent';

const Dashboard = React.createClass({
  contextTypes: {
    location: PropTypes.object
  },

  mixins: [
    Reflux.connect(ProfileBillingPlanStore, 'billing'),
    Reflux.connect(InstancesStore, 'instances')
  ],

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
    InstancesStore.init();
  },

  componentWillUnmount() {
    ProfileBillingPlanStore.clearData();
    InstancesStore.clearData();
  },

  getStyles() {
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      },
      blurPageDialog: {
        top: '5%'
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

  renderOnboardingDialog() {
    const { myInstances, sharedInstances } = this.state.instances;
    const instances = [...myInstances, ...sharedInstances];
    const styles = this.getStyles();

    if (instances.length > 0) return null;

    return (
      <BlurPageDialog
        style={styles.blurPageDialog}
        open={true}
      >
        <OnboardingDialogContent />
      </BlurPageDialog>
    );
  },

  render() {
    const styles = this.getStyles();
    const { children } = this.props;

    return (
      <div style={styles.root}>
        <Header />
        {children}
        {this.renderUpgradeToolbar()}
        <InstanceDialog />
      </div>
    );
  }
});

export default withRouter(Dashboard);
