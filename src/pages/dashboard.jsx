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

  renderUpgradeToolbar() {
    const plan = ProfileBillingPlanStore.getPlan();
    const endDate = ProfileBillingPlanStore.getActiveSubscriptionEndDate();

    if (plan !== 'builder') {
      return null;
    }

    return <UpgradeNowToolbar subscriptionEndDate={endDate} />;
  },

  render() {
    const { children } = this.props;
    const styles = {
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    };

    return (
      <div style={styles}>
        <Header />
        {children}
        {this.renderUpgradeToolbar()}
        <InstanceDialog />
      </div>
    );
  }
});

export default withRouter(Dashboard);
