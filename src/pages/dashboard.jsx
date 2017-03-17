import React, { PropTypes } from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';

import SessionStore from '../apps/Session/SessionStore';
import ProfileActions from '../apps/Profile/ProfileActions';
import ProfileBillingPlanStore from '../apps/Profile/ProfileBillingPlanStore';
import RuntimeActions from '../apps/Runtimes/RuntimesActions';

import { Header, UpgradeNowToolbar } from '../common/';
import InstanceDialog from '../apps/Instances/InstanceDialog';
import BlurPageDialog from '../common/Dialog/BlurPageDialog';
import BetaDialogContent from '../common/BetaDialogContent/BetaDialogContent';

const Dashboard = React.createClass({
  contextTypes: {
    location: PropTypes.object
  },

  childContextTypes: {
    onApplyBeta: React.PropTypes.function
  },

  mixins: [Reflux.connect(ProfileBillingPlanStore, 'billing')],

  getChildContext() {
    return {
      onApplyBeta: this.onApplyBeta
    };
  },

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

  onApplyBeta() {
    window.analytics.track('Beta user subscription');
    ProfileActions.updateSettings({
      metadata: {
        betaSignUp: new Date().getTime()
      }
    });
    this.setState({
      showBetaDialog: true
    });
  },

  closeBetaDialog() {
    this.setState({
      showBetaDialog: false
    });
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
        <Header />
        {children}
        {this.renderUpgradeToolbar()}
        <BlurPageDialog
          open={this.state.showBetaDialog}
          onRequestClose={this.closeBetaDialog}
        >
          <BetaDialogContent />
        </BlurPageDialog>
        <InstanceDialog />
      </div>
    );
  }
});

export default withRouter(Dashboard);
