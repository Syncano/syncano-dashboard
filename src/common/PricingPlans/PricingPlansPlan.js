import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import numeral from 'numeral';
import _ from 'lodash';

import { PricingPlansUtil } from '../../utils';

import ProfileBillingPlanStore from '../../apps/Profile/ProfileBillingPlanStore';
import PlanDialogActions from '../../apps/Profile/ProfileBillingPlanDialogActions';

import { Paper, Subheader, SelectField, List, ListItem, MenuItem, RaisedButton } from 'material-ui';

class PricingPlansPlan extends Component {
  constructor(props, context) {
    super(props);

    const { isDowngrade } = context;

    this.state = this.getInitialPrices(props, isDowngrade);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { isDowngrade } = nextContext;

    this.setState(this.getInitialPrices(nextProps, isDowngrade));
  }

  getInitialPrices(props, isDowngrade) {
    const { apiOptions, cbxOptions } = props;

    return {
      apiPrice: this.getInitialOption(apiOptions, isDowngrade),
      cbxPrice: this.getInitialOption(cbxOptions, isDowngrade)
    };
  }

  getInitialOption(options, isDowngrade) {
    const { title } = this.props;
    const pricingPlanName = _.upperFirst(ProfileBillingPlanStore.getPricingPlanKey());

    if (options.length === 1) {
      return options[0].price;
    }

    if (isDowngrade && title === pricingPlanName) {
      return options[options.length - 2].price;
    }

    if (isDowngrade) {
      return _.last(options).price;
    }

    if (title === pricingPlanName) {
      return options[1].price;
    }

    return options[0].price;
  }

  getStyles = () => ({
    heading: {
      fontSize: '1.3em',
      height: 65,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      position: 'relative'
    },
    headingSmall: {
      fontSize: 13,
      width: '100%',
      marginBottom: 6,
      position: 'absolute',
      top: 0,
      color: '#AAA'
    },
    pricingPlansPlan: {
      maxWidth: 350,
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'left'
    },
    pricingPlansPlanHighlighted: {
      backgroundColor: '#f5f5f5'
    },
    pricingPlansPlanContent: {
      padding: 16
    },
    subheader: {
      textAlign: 'center',
      padding: 0,
      borderBottom: 'solid 1px rgba(0, 0, 0, .117647)',
      fontWeight: 700
    },
    price: {
      fontWeight: 700,
      color: '#333A42',
      fontSize: 48,
      textAlign: 'center',
      textTransform: 'uppercase',
      lineHeight: 1
    },
    period: {
      fontSize: 18,
      fontWeight: 500,
      color: '#757E88',
      textAlign: 'center',
      lineHeight: 1,
      height: 18
    },
    includes: {
      padding: 0,
      lineHeight: 1,
      marginTop: 24,
      marginBottom: 12
    },
    button: {
      width: '100%',
      height: 44,
      marginTop: 24
    },
    listItemInnerDiv: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 48
    },
    listItemIcon: {
      width: 'auto',
      height: 'auto',
      margin: 0,
      top: '50%',
      left: 16,
      transform: 'translateY(-50%)'
    },
    footer: {
      marginTop: 16,
      color: '#AAA'
    },
    textlink: {
      color: '#42a5f5',
      cursor: 'pointer'
    }
  })

  getPlanHeaderContent() {
    const { price } = this.props;

    if (price === 'Free') {
      const subscriptionEndDate = ProfileBillingPlanStore.getActiveSubscriptionEndDate();

      return `(will expire at ${subscriptionEndDate})`;
    }

    const isNewSubscriptionVisible = ProfileBillingPlanStore.isNewSubscriptionVisible();

    if (isNewSubscriptionVisible) {
      const newSubscriptionPrice = ProfileBillingPlanStore.getNewPlanTotalValue();

      return `Your new plan ($${newSubscriptionPrice}) starts next month`;
    }

    const isPlanCanceled = ProfileBillingPlanStore.isPlanCanceled();

    if (isPlanCanceled) {
      return '(will expire at the end of the month)';
    }

    return null;
  }

  isButtonDisabled() {
    const { apiPrice, cbxPrice } = this.state;
    const currentApiPrice = ProfileBillingPlanStore.getCurrentPlanValue('api');
    const currentCbxPrice = ProfileBillingPlanStore.getCurrentPlanValue('cbx');
    const newApiPrice = ProfileBillingPlanStore.getNewPlanValue('api');
    const newCbxPrice = ProfileBillingPlanStore.getNewPlanValue('cbx');

    if (apiPrice === currentApiPrice && cbxPrice === currentCbxPrice) {
      return true;
    }

    if (apiPrice === newApiPrice && cbxPrice === newCbxPrice) {
      return true;
    }

    return false;
  }

  handleSelectChange(event, field, value) {
    this.setState({ [field]: value });
  }

  handleButtonTouchTap = () => {
    const { apiPrice, cbxPrice } = this.state;
    const { apiOptions, cbxOptions, features } = this.props;
    const apiOption = _.find(apiOptions, { price: apiPrice });
    const cbxOption = _.find(cbxOptions, { price: cbxPrice });

    PlanDialogActions.selectPricingPlan(apiOption, cbxOption, features);
    PlanDialogActions.showDialog();
  }

  handleCancelLinkClick = () => {
    const { router } = this.props;

    router.push('profile-billing-plan-cancel');
  }

  handleDowngradeLinkClick = () => {
    const { router } = this.props;

    window.scrollTo(0, 0);
    router.push('profile-billing-plan-downgrade');
  }

  formatSelectLabel = (field, option) => {
    const label = {
      apiPrice: 'API calls',
      cbxPrice: 'Script seconds'
    };

    return `
      ${_.toUpper(numeral(option.included).format('0 a'))}
      ${label[field]}
      ${option.price > 0 ? `- $${option.price}` : ''}
    `;
  }

  renderPlanHeader(isCurrent) {
    const styles = this.getStyles();

    if (!isCurrent) {
      return <div style={styles.heading} />;
    }

    const content = this.getPlanHeaderContent(isCurrent);

    return (
      <div style={styles.heading}>
        {content && <div style={styles.headingSmall}>
          {content}
        </div>}
        <div>Your Current Plan</div>
      </div>
    );
  }

  renderPrice() {
    const styles = this.getStyles();
    const { apiPrice, cbxPrice } = this.state;
    const { price } = this.props;
    const value = price || apiPrice + cbxPrice;

    if (price === 'Free') {
      return (
        <div style={styles.price}>
          {price}
        </div>
      );
    }

    return (
      <div style={styles.price}>
        <span style={{ fontSize: 24 }}>
          &#36;
        </span>
        {value}
      </div>
    );
  }

  renderSelect(field) {
    const { apiOptions, cbxOptions } = this.props;
    const options = {
      apiPrice: apiOptions,
      cbxPrice: cbxOptions
    };
    const count = options[field].length;

    return (
      <div>
        <SelectField
          key={field}
          value={this.state[field]}
          onChange={(event, index, value) => this.handleSelectChange(event, field, value)}
          disabled={count < 2}
        >
          {_.map(options[field], (option) => (
            <MenuItem
              key={option.price}
              value={option.price}
              primaryText={this.formatSelectLabel(field, option)}
            />
          ))}
        </SelectField>
      </div>
    );
  }

  renderFeatures() {
    const styles = this.getStyles();
    const { features } = this.props;

    return (
      <List>
        {features.map((feature) => (
          <ListItem
            key={_.kebabCase(feature)}
            primaryText={feature}
            innerDivStyle={styles.listItemInnerDiv}
            disabled={true}
            leftIcon={
              <img
                src={'/img/check.svg'}
                alt="check icon"
                style={styles.listItemIcon}
              />
            }
          />
        ))}
      </List>
    );
  }

  renderCurrentPlanFooter() {
    const styles = this.getStyles();
    const lowestPrice = PricingPlansUtil.getLowestPrice();
    const price = ProfileBillingPlanStore.getPlanTotalValue();

    let content = (
      <div>
        {'You can '}
        <span
          style={styles.textlink}
          onTouchTap={this.handleDowngradeLinkClick}
        >
          downgrade
        </span>
        {' or '}
        <span
          style={styles.textlink}
          onTouchTap={this.handleCancelLinkClick}
          data-e2e="cancel-plan-button"
        >
          cancel
        </span>
        {' at any time.'}
      </div>
    );

    if (price <= lowestPrice) {
      content = (
        <div>
          {'You can '}
          <span
            style={styles.textlink}
            onTouchTap={this.handleCancelLinkClick}
            data-e2e="cancel-plan-button"
          >
            cancel
          </span>
          {' at any time.'}
        </div>
      );
    }

    return (
      <div style={styles.footer}>
        {content}
      </div>
    );
  }

  render() {
    const styles = this.getStyles();
    const { isCurrent, isHidden, title, price, disabled } = this.props;
    const { isDowngrade } = this.context;
    const { apiCallsPrice, scriptsPrice } = this.state;
    const defaultButtonLabel = isDowngrade ? 'Downgrade' : 'Upgrade';
    const period = (price === 'Free') ? null : 'per month';

    if (isHidden) {
      return null;
    }

    if (isCurrent) {
      _.assign(styles.pricingPlansPlan, styles.pricingPlansPlanHighlighted);
    }

    return (
      <div className="col-flex-1">
        {this.renderPlanHeader(isCurrent)}
        <Paper
          zDepth={isCurrent ? 2 : 1}
          style={styles.pricingPlansPlan}
        >
          <Subheader style={styles.subheader}>
            {title}
          </Subheader>
          <div style={styles.pricingPlansPlanContent}>
            {this.renderPrice()}
            <div style={styles.period}>
              {period}
            </div>
            <Subheader style={styles.includes}>
              Includes:
            </Subheader>
            {this.renderSelect('apiPrice')}
            {this.renderSelect('cbxPrice')}
            <RaisedButton
              label={isCurrent ? 'Current Plan' : defaultButtonLabel}
              backgroundColor="#FFCC01"
              labelStyle={{ fontWeight: 700, color: '#1D2228' }}
              style={styles.button}
              onTouchTap={this.handleButtonTouchTap}
              disabled={disabled || this.isButtonDisabled()}
              data-e2e={`${apiCallsPrice + scriptsPrice}-plan-upgrade-button`}
            />
          </div>
          {this.renderFeatures()}
        </Paper>
        {isCurrent && title !== 'Starter' && !isDowngrade && this.renderCurrentPlanFooter()}
      </div>
    );
  }
}

PricingPlansPlan.contextTypes = {
  isDowngrade: PropTypes.bool
};

export default withRouter(PricingPlansPlan);
