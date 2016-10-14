import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import Radium from 'radium';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { FormMixin } from '../../mixins';

import ProfileBillingPlanStore from './ProfileBillingPlanStore';
import ProfileBillingPlanActions from './ProfileBillingPlanActions';
import ChartActions from '../Profile/ProfileBillingChartActions';
import PlanDialogStore from './ProfileBillingPlanDialogStore';
import PlanDialogActions from './ProfileBillingPlanDialogActions';

import { RaisedButton, TextField } from 'material-ui';
import { Billing, Container, InnerToolbar, Loading, PricingPlans } from '../../common/';
import PlanDialog from './ProfileBillingPlanDialog';
import PlanReceiptDialog from './ProfileBillingPlanReceiptDialog';

const ProfileBillingPlan = Radium(React.createClass({
  mixins: [
    Reflux.connect(ProfileBillingPlanStore),
    Reflux.connect(PlanDialogStore),
    FormMixin
  ],

  validatorConstraints() {
    return {
      soft_limit: {
        numericality: {
          onlyInteger: true,
          lessThan: 10000000000
        }
      },
      hard_limit: {
        numericality: {
          onlyInteger: true,
          lessThan: 10000000000
        },
        equality: {
          attribute: 'soft_limit',
          message: '^Hard limit has to be higher than soft limit',
          comparator: (v1, v2) => parseInt(v1, 10) > parseInt(v2, 10)
        }
      }
    };
  },

  getChildContext() {
    const { router } = this.props;

    return {
      isDowngrade: router.isActive('profile-billing-plan-downgrade')
    };
  },

  componentDidMount() {
    ProfileBillingPlanActions.fetchBillingProfile();
    ProfileBillingPlanActions.fetchBillingSubscriptions();
    ChartActions.fetchBillingProfile();
    ChartActions.fetchTotalDailyUsage();
  },

  getStyles() {
    return {
      main: {
        marginTop: 50,
        paddingRight: 50,
        color: '#4A4A4A'
      },
      comment: {
        fontSize: '0.9em'
      },
      heading: {
        fontSize: '1.3em'
      },
      smallText: {
        marginTop: 3,
        color: '#AAA',
        fontSize: 12
      },
      sectionComment: {
        fontSize: 14,
        lineHeight: '1.5em',
        color: '#AAA'
      },
      bottomContainer: {
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      limitsInputContainer: {
        display: 'flex',
        alignItems: 'baseline'
      },
      limitsSymbol: {
        position: 'relative',
        top: -1,
        paddingRight: 4
      }
    };
  },

  handleShowPlanDialog() {
    PlanDialogActions.showDialog();
  },

  handlePlanDialogDismiss() {
    ProfileBillingPlanActions.fetch();
  },

  handleSuccessfullValidation() {
    ProfileBillingPlanActions.updateBillingProfile({
      hard_limit: this.state.hard_limit,
      soft_limit: this.state.soft_limit
    });
  },

  renderLimitsForm() {
    const styles = this.getStyles();
    const plan = ProfileBillingPlanStore.getPlan();

    if (plan === 'builder' || plan === 'free') {
      return null;
    }

    return (
      <div style={styles.bottomContainer}>
        <form
          onSubmit={this.handleFormValidation}
          method="post"
          acceptCharset="UTF-8"
        >
          {this.renderFormNotifications()}
          <div className="row">
            <div className="col-flex-1">
              <div style={styles.heading}>
                Limits
              </div>
              <div
                className="vp-1-t"
                style={styles.sectionComment}
              >
                Here you can set limits for your plan. You will be notified after reaching soft limit. After reaching
                hard limit your account will be frozen to avoid additional costs.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-flex-2">
              <div style={styles.limitsInputContainer}>
                <div style={styles.limitsSymbol}>$</div>
                <TextField
                  ref="soft_limit"
                  value={this.state.soft_limit}
                  onChange={(event, value) => this.setState({ soft_limit: value })}
                  errorText={this.getValidationMessages('soft_limit').join(' ')}
                  name="soft_limit"
                  floatingLabelText="Soft Limit"
                  fullWidth={true}
                />
              </div>
            </div>
            <div className="col-flex-2">
              <div style={styles.limitsInputContainer}>
                <div style={styles.limitsSymbol}>$</div>
                <TextField
                  ref="hard_limit"
                  value={this.state.hard_limit}
                  onChange={(event, value) => this.setState({ hard_limit: value })}
                  errorText={this.getValidationMessages('hard_limit').join(' ')}
                  name="hard_limit"
                  floatingLabelText="Hard Limit"
                  fullWidth={true}
                />
              </div>
            </div>
            <div className="col-flex-1">
              <div className="vp-3-t">
                <RaisedButton
                  type="submit"
                  label="Set Limits"
                  disabled={(!this.state.hard_limit && !this.state.soft_limit)}
                  data-e2e="set-limits-button"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  },

  renderChart() {
    const styles = this.getStyles();

    if (!this.state.chartLegend) {
      return null;
    }

    if (_.isEmpty(this.state.chartLegend.rows)) {
      return null;
    }

    return (
      <div style={styles.bottomContainer}>
        <div className="row">
          <div
            className="col-flex-1"
            style={styles.heading}
          >
            See how it works with your <strong>current plan</strong>:
          </div>
        </div>
        <div className="row vp-3-t">
          <div className="col-flex-1">
            <Billing.ChartLegend {...this.state.chartLegend} />
          </div>
        </div>
      </div>
    );
  },

  render() {
    const { isLoading } = this.state;
    const pricingPlanName = ProfileBillingPlanStore.getPricingPlanName();

    return (
      <Loading show={isLoading}>
        <Helmet title="Billing Plan" />
        <PlanDialog onDismiss={this.handlePlanDialogDismiss} />
        <PlanReceiptDialog />
        <InnerToolbar
          title={
            <div>
              {'Your plan: '}
              <span><strong data-e2e="plan-name-text">{pricingPlanName}</strong></span>
            </div>
          }
        />
        <Container>
          <div className="row">
            <div className="col-flex-1">
              <PricingPlans />
            </div>
          </div>
          <div className="row vp-6-t">
            <div className="col-flex-1">
              {this.renderLimitsForm()}
            </div>
          </div>
          <div className="row vp-6-t">
            <div className="col-flex-1">
              {this.renderChart()}
            </div>
          </div>
        </Container>
      </Loading>
    );
  }
}));

ProfileBillingPlan.childContextTypes = {
  isDowngrade: PropTypes.bool
};

export default withRouter(ProfileBillingPlan);
