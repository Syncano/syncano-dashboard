import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { PricingPlansUtil } from '../../utils';

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
    const currentApiPrice = ProfileBillingPlanStore.getCurrentPlanValue('api');
    const currentCbxPrice = ProfileBillingPlanStore.getCurrentPlanValue('cbx');
    const plans = PricingPlansUtil.getPlans(currentApiPrice, currentCbxPrice);
    const pricingPlanKey = ProfileBillingPlanStore.getPricingPlanKey();
    const price = ProfileBillingPlanStore.getPlanTotalValue();

    if (!price) {
      return null;
    }

    return (
      <PricingPlansPlan
        {...plans[pricingPlanKey]}
        isCurrent={true}
        isHidden={false}
        apiOptions={PricingPlansUtil.getOptions('api', currentApiPrice, currentApiPrice)}
        cbxOptions={PricingPlansUtil.getOptions('cbx', currentCbxPrice, currentCbxPrice)}
        price={price}
        disabled={true}
      />
    );
  }

  render() {
    const styles = this.getStyles();
    const { isDowngrade, isLowTierPromo } = this.context;
    const currentApiPrice = ProfileBillingPlanStore.getCurrentPlanValue('api');
    const currentCbxPrice = ProfileBillingPlanStore.getCurrentPlanValue('cbx');
    const plans = PricingPlansUtil.getPlans(currentApiPrice, currentCbxPrice, isDowngrade, isLowTierPromo);

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
  isDowngrade: PropTypes.bool,
  isLowTierPromo: PropTypes.bool
};

export default withRouter(PricingPlans);
