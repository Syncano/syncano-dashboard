import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';
import { Grid, Breakpoint } from 'react-responsive-grid';

import SessionStore from '../apps/Session/SessionStore';
import ProfileBillingPlanStore from '../apps/Profile/ProfileBillingPlanStore';

import { RaisedButton } from 'material-ui';
import { Header, MobileOnboarding, UpgradeNowToolbar } from '../common/';
import InstanceDialog from '../apps/Instances/InstanceDialog';

const Dashboard = React.createClass({
  contextTypes: {
    location: React.PropTypes.object
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
        <Grid style={styles}>
          <Breakpoint
            minWidth={768}
            widthMethod="componentWidth"
            style={styles}
          >
            <Header />
            {children}
            {this.renderUpgradeToolbar()}
            <InstanceDialog />
          </Breakpoint>
          <Breakpoint
            maxWidth={767}
            widthMethod="componentWidth"
          >
            <MobileOnboarding>
              <MobileOnboarding.Slide
                headline="Welcome to Syncano"
                text={
                  <div>
                    <p className="vm-4-b">
                      Unfortunately, the Syncano Dashboard is not optimized for smartphones just yet. You’ll have to
                      open it on a tablet or computer.
                    </p>
                    <p>For now, we’d like to show you some of the things you’ll be able to do here!</p>
                  </div>
                }
                imageSrc={'/img/illustrations/build-powerful-apps-in-half-the-time.svg'}
              />
              <MobileOnboarding.Slide
                headline="What is Syncano?"
                text={
                  <p>
                    Syncano is a platform designed to help you increase your productivity, focus on new features, and
                    scale without managing servers.
                  </p>
                }
              >
                <img
                  src={'/img/illustrations/what-is-syncano.png'}
                  alt="What is Syncano?"
                  style={{ display: 'block', width: '100vw', margin: '0 -30px' }}
                />
              </MobileOnboarding.Slide>
              <MobileOnboarding.Slide
                headline="Sockets"
                text={
                  <p>
                    Simplify your stack. Piece together one or multiple features as building blocks for your app. Use
                    Syncano Sockets as a data hub and easily connect disparate backend systems.
                  </p>
                }
                imageSrc={'/img/illustrations/assemble-your-backend-with-building-blocks.svg'}
              />
              <MobileOnboarding.Slide headline="Join the Community">
                <img
                  src={'/img/illustrations/syncano-slack.svg'}
                  alt="Join the Community"
                  style={{ display: 'block', margin: '0 auto' }}
                />
                <a
                  href="https://www.syncano.io/slack-invite/"
                  target="_blank"
                >
                  <RaisedButton
                    label="Send an Invite"
                    backgroundColor="#FFCC01"
                    labelColor="#1D2228"
                    labelStyle={{ fontWeight: 700 }}
                    style={{ marginTop: 30 }}
                  />
                </a>
                <div style={{ marginTop: 50, fontSize: 20, fontWeight: 500, color: '#244273' }}>
                  Connect with us
                </div>
                <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
                  <a
                    href="https://twitter.com/Syncano/"
                    target="_blank"
                    style={{ display: 'block', fontSize: 36, color: '#afb8c2', margin: '0 10px' }}
                  >
                    <span className="synicon-twitter" />
                  </a>
                  <a
                    href="https://www.facebook.com/syncano/"
                    target="_blank"
                    style={{ display: 'block', fontSize: 36, color: '#afb8c2', margin: '0 10px' }}
                  >
                    <span className="synicon-facebook-box" />
                  </a>
                </div>
              </MobileOnboarding.Slide>
            </MobileOnboarding>
          </Breakpoint>
        </Grid>
      </div>
    );
  }
});

export default withRouter(Dashboard);
