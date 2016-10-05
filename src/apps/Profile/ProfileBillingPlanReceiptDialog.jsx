import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';

import { DialogMixin } from '../../mixins';

import Store from './ProfileBillingPlanReceiptDialogStore';
import PlanStore from './ProfileBillingPlanStore';
import BillingPlanActions from './ProfileBillingPlanActions';
import PlanDialogActions from './ProfileBillingPlanDialogActions';
import PlanDialogStore from './ProfileBillingPlanDialogStore';
import SessionStore from '../Session/SessionStore';

import { RaisedButton } from 'material-ui';

import { CreditCard, Dialog } from '../../common/';

const ProfileBillingPlanReceiptDialog = React.createClass({
  displayName: 'ProfileBillingPlanReceiptDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin
  ],

  getStyles() {
    return {
      narrowWrapper: {
        maxWidth: '500px',
        margin: '0 auto'
      },
      title: {
        fontSize: '1.5em',
        lineHeight: '1.5em'
      },
      sectionTopic: {
        fontSize: '1.2em'
      },
      sectionComment: {
        fontSize: 14,
        lineHeight: '1.5em',
        color: '#AAA'
      },
      textlink: {
        color: '#42a5f5',
        cursor: 'pointer'
      }
    };
  },

  handleDialogShow() {
    console.debug('ProfileBillingPlanReceiptDialog::handleDialogShow');
    PlanDialogActions.fetchBillingCard();
  },

  handleDismiss() {
    BillingPlanActions.fetchBillingProfile();
    BillingPlanActions.fetchBillingSubscriptions();
    PlanDialogStore.resetSelectedPricingPlan();
    this.handleCancel();
  },

  renderHeader() {
    const styles = this.getStyles();
    const selectedPricingPlanName = PlanDialogStore.getSelectedPricingPlanName();
    const selectedPricingPlanPrice = PlanDialogStore.getTotalPlanValue();

    let title = (
      <span>
        Your Current Plan is: <strong>{selectedPricingPlanName}</strong> (${selectedPricingPlanPrice} per month)
      </span>
    );
    let text = `Your monthly billing cycle starts on the 1st day of every month. Your payment for the current month will
      be prorated and charged immediately.`;

    if (PlanStore.getPlanTotalValue()) {
      title = (
        <span>
          Your Next Plan will be: <strong>{selectedPricingPlanName}</strong> (${selectedPricingPlanPrice} per month)
        </span>
      );
      text = 'We will charge your new monthly Plan price when the next billing period starts.';
    }

    return (
      <div>
        <div className="row vp-3-b">
          <div className="col-1-flex">
            <div style={styles.sectionTopic}>
              {title}
            </div>
          </div>
        </div>
        <div className="row vp-1-b">
          <div className="col-1-flex">
            <div style={styles.sectionComment}>
              {text}
            </div>
          </div>
        </div>
      </div>
    );
  },

  renderPaymentMethod() {
    const styles = this.getStyles();
    const { card } = PlanDialogStore.data;

    if (!card) {
      return null;
    }

    return (
      <div>
        <div className="row vp-5-t vp-3-b">
          <div className="col-1-flex">
            <div style={styles.sectionTopic}>
              Your payment method is:
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-1-flex">
            <CreditCard card={card} />
          </div>
        </div>
      </div>
    );
  },

  render() {
    const styles = this.getStyles();
    const userEmail = SessionStore.getUser() && SessionStore.getUser().email;
    const { router } = this.props;
    const dialogCustomActions = [
      <div style={styles.narrowWrapper}>
        <RaisedButton
          label="Close"
          onTouchTap={this.handleDismiss}
          data-e2e="go-back-button"
        />
      </div>
    ];

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        actions={dialogCustomActions}
        open={this.state.open}
        isLoading={this.state.isLoading}
        onRequestClose={this.handleDismiss}
      >
        <div style={styles.narrowWrapper}>
          <div className="row vp-5-b">
            <div className="col-1-flex">
              <div style={styles.title}>Thank you for your purchase</div>
            </div>
          </div>

          {this.renderHeader()}

          <div className="row vp-1-t">
            <div
              className="col-1-flex"
              style={styles.sectionComment}
            >
              A confirmation email has been sent to ​{userEmail}. All invoices will be sent to {userEmail}.
            </div>
          </div>
          <div className="row vp-1-t">
            <div
              className="col-1-flex"
              style={styles.sectionComment}
            >
              {'You can check your '}
              <span
                style={styles.textlink}
                onClick={() => router.push('profile-billing-invoices')}
              >
                invoices
              </span>
              {' or change your '}
              <span
                style={styles.textlink}
                onClick={() => router.push('profile-billing-address')}
              >
                billing address
              </span>
              {'. If you have any questions related to billing, please check our '}
              <a
                style={styles.textlink}
                href="http://docs.syncano.io/docs/faq/"
                target="_blank"
              >
                FAQ
              </a>
              {' or write us.'}
            </div>
          </div>

          {this.renderPaymentMethod()}
        </div>
      </Dialog.FullPage>
    );
  }
});

export default withRouter(ProfileBillingPlanReceiptDialog);
