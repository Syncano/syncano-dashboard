import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router';

import Store from './ProfileBillingPlanStore';
import Actions from './ProfileBillingPlanActions';

import { Container, InnerToolbar, Loading } from '../../common/';
import ProfileBillingPlanCancelForm from './ProfileBillingPlanCancelForm';

import { RaisedButton } from 'material-ui';

const ProfileBillingPlanCancel = Radium(React.createClass({
  displayName: 'ProfileBillingPlanCancel',

  mixins: [Reflux.connect(Store)],

  componentWillMount() {
    const planName = Store.getPlan();
    const { router } = this.props;

    if (planName && planName !== 'paid-commitment') {
      router.push('profile-billing-plan');
    }
  },

  componentDidMount() {
    Actions.fetchBillingProfile();
  },

  getStyles() {
    return {
      main: {
        maxWidth: 550
      },
      heading: {
        fontSize: '1.3em',
        lineHeight: '1.5em'
      }
    };
  },

  getErrorMessage() {
    const styles = this.getStyles();

    return (
      <div>
        <div
          className="vp-3-b"
          style={styles.heading}
        >
          There was an error sending your request.
        </div>
        <div>
          Sorry about that. Please write us at <a href={`mailto:${SYNCANO_BILLING_EMAIL}`}>{SYNCANO_BILLING_EMAIL}</a>.
        </div>
      </div>
    );
  },

  getThankYouMessage() {
    const styles = this.getStyles();

    return (
      <div data-e2e="successfull-cancel-plan-message">
        <div
          className="vp-3-b"
          style={styles.heading}
        >
          Thank you!
        </div>
        <div>Your request to cancel your plan has been received.</div>
        <div className="vp-2-t">
          Please remember that your subscription is still active, and it may take up to 48 hours to process it. If your
          account is charged within this time you will be refunded fully.
        </div>
        <div className="vp-2-t">
          {'If you have any questions regarding your plan, please write to '}
          <a href={`mailto:${SYNCANO_BILLING_EMAIL}`}>{SYNCANO_BILLING_EMAIL}</a>.
        </div>
      </div>
    );
  },

  renderMessage(status) {
    const { router } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-flex-1">
            {status === 'done' ? this.getThankYouMessage() : this.getErrorMessage()}
          </div>
        </div>
        <div className="row vp-3-t">
          <div className="col-flex-1">
            <RaisedButton
              label="Go back"
              onTouchTap={() => router.push('profile-billing-plan')}
              primary={true}
              data-e2e="cancel-plan-message-back-button"
            />
          </div>
        </div>
      </div>
    );
  },

  render() {
    const styles = this.getStyles();
    const { isLoading } = this.state;
    const status = Store.data.cancelSubscriptionRequest;

    if (isLoading) {
      return <Loading show={true} />;
    }

    return (
      <div>
        <Helmet title="Cancel my Plan" />
        <InnerToolbar title="Cancel my Plan" />
        <Container>
          <div style={styles.main}>
            {(status === 'error' || status === 'done') ? this.renderMessage(status) : <ProfileBillingPlanCancelForm />}
          </div>
        </Container>
      </div>
    );
  }
}));

export default withRouter(ProfileBillingPlanCancel);
