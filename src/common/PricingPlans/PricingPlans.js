import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';

import PricingPlansUtil from '../../utils/PricingPlansUtil';

import ProfileBillingPlanStore from '../../apps/Profile/ProfileBillingPlanStore';
import PlanDialogActions from '../../apps/Profile/ProfileBillingPlanDialogActions';

import { RaisedButton } from 'material-ui';
import PricingPlansPlan from './PricingPlansPlan';

class PricingPlans extends Component {
  getStyles = () => ({
    container: {
      textAlign: 'center',
      flexWrap: 'nowrap'
    },
    main: {
      display: 'inline-flex'
    },
    footer: {
      textAlign: 'center'
    }
  })

  redirectToPlanView = () => {
    const { router } = this.props;

    router.push('/account/plan/');
  }

  renderBackLink() {
    const { isDowngrade } = this.context;

    if (!isDowngrade) {
      return null;
    }

    return (
      <div className="row vm-3-b">
        <div className="col-flex-1">
          <a onTouchTap={this.redirectToPlanView}>
            Go Back
          </a>
        </div>
      </div>
    );
  }

  renderCurrentPlan = () => {
    const currentAPIPrice = ProfileBillingPlanStore.getCurrentPlanValue('api');
    const currentScriptsPrice = ProfileBillingPlanStore.getCurrentPlanValue('cbx');
    const plans = PricingPlansUtil.getPlans(currentAPIPrice, currentScriptsPrice);
    const pricingPlanName = ProfileBillingPlanStore.getPricingPlanName();
    const price = ProfileBillingPlanStore.getPlanTotalValue();

    if (!price) {
      return null;
    }

    return (
      <PricingPlansPlan
        {...plans[pricingPlanName]}
        isCurrent={true}
        isHidden={false}
        apiCallsOptions={PricingPlansUtil.getOptions('apiCalls', currentAPIPrice, currentAPIPrice)}
        scriptsOptions={PricingPlansUtil.getOptions('scripts', currentScriptsPrice, currentScriptsPrice)}
        price={price}
        disabled={true}
      />
    );
  }

  render() {
    const styles = this.getStyles();
    const { isDowngrade } = this.context;
    const currentAPIPrice = ProfileBillingPlanStore.getCurrentPlanValue('api');
    const currentScriptsPrice = ProfileBillingPlanStore.getCurrentPlanValue('cbx');
    const plans = PricingPlansUtil.getPlans(currentAPIPrice, currentScriptsPrice, isDowngrade);

    return (
      <div>
        {this.renderBackLink()}

        <div style={styles.container}>
          <div
            className="row"
            style={styles.main}
          >
            {this.renderCurrentPlan()}
            {_.map(plans, (plan) => <PricingPlansPlan {...plan} />)}
          </div>
          <footer
            className="row vm-3-t"
            style={styles.footer}
          >
            <div
              className="col-flex-1"
              style={{ textAlign: 'center' }}
            >
              <RaisedButton
                label="Configure your own plan"
                onTouchTap={PlanDialogActions.showDialog}
                data-e2e="open-plans-explorer-button"
              />
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

PricingPlans.contextTypes = {
  isDowngrade: PropTypes.bool
};

export default withRouter(PricingPlans);
