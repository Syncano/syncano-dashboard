import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import numeral from 'numeral';
import valid from 'card-validator';

import { DialogMixin, FormMixin } from '../../mixins';

import ProfileBillingPlanDialogStore from './ProfileBillingPlanDialogStore';
import ProfileBillingPlanStore from './ProfileBillingPlanStore';
import ProfileBillingPlanDialogActions from './ProfileBillingPlanDialogActions';

import {
  FontIcon,
  List,
  ListItem,
  Paper,
  RaisedButton,
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui';
import { CreditCardForm, CreditCard, Dialog, Loading, Show, Slider } from '../../common/';

const ProfileBillingPlanDialog = React.createClass({
  mixins: [
    Reflux.connect(ProfileBillingPlanDialogStore),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    if (this.state.card) {
      return true;
    }

    return {
      number: {
        presence: true,
        length: {
          minimum: 12,
          maximum: 16,
          tokenizer: (value) => _.camelCase(value)
        }
      },
      exp_month: {
        presence: true,
        numericality: {
          onlyInteger: true,
          greaterThan: 0,
          lessThanOrEqualTo: 12
        },
        length: {
          maximum: 2
        }
      },
      exp_year: {
        presence: true,
        numericality: {
          onlyInteger: true
        },
        length: {
          is: 2
        }
      },
      cvc: {
        presence: true,
        numericality: {
          onlyInteger: true,
          greaterThan: 0
        },
        length: {
          minimum: 3,
          maximum: 4
        }
      }
    };
  },

  getValidatorAttributes() {
    if (this.state.card) {
      return {};
    }

    const data = this.getFormAttributes();

    return {
      number: data.number,
      cvc: data.cvc,
      exp_month: data.exp_month,
      exp_year: data.exp_year
    };
  },

  getStyles() {
    return {
      main: {
        marginTop: 50,
        fontColor: '#4A4A4A'
      },
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
      table: {
        marginTop: 20
      },
      tableRow: {
        height: 40,
        textAlign: 'left',
        lineHeight: '40px',
        verticalAlign: 'middle'
      },
      tableColumnSummary: {
        height: 40,
        margin: 1,
        fontSize: '1.1em',
        fontWeight: 'bold',
        textAlign: 'right',
        background: '#F2F2F2',
        verticalAlign: 'middle',
        lineHeight: '40px'
      },
      sectionTotalSummary: {
        marginTop: 20,
        height: 80,
        fontSize: '1.4em',
        lineHeight: '1.4em',
        background: '#CBEDA5',
        padding: 14
      },
      sectionComment: {
        fontSize: 14,
        lineHeight: '1.5em',
        color: '#AAA'
      },
      tableRowColumn: {
        fontSize: 16
      },
      tableSmallRowColumn: {
        fontSize: 14
      },
      tableFooterRow: {
        fontWeight: 700
      },
      listItemInnerDiv: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 40
      },
      listItemIcon: {
        width: 'auto',
        height: 'auto',
        margin: 0,
        top: '50%',
        left: 8,
        transform: 'translateY(-50%)'
      },
      synicon: {
        fontSize: 20,
        background: '#4CAF50',
        padding: '3px 4px',
        borderRadius: 3,
        marginRight: 10
      },
      paymentIcon: {
        width: 40,
        height: 'auto',
        display: 'block',
        marginRight: 10
      },
      paymentIconHidden: {
        opacity: '.1'
      }
    };
  },

  onCardNumberChange(event, value) {
    const numberValidation = valid.number(_.camelCase(value));
    const niceType = numberValidation.card ? numberValidation.card.niceType : null;

    this.setState({
      number: value,
      cardNiceType: niceType
    });
  },

  handleDismiss() {
    ProfileBillingPlanDialogStore.resetSelectedPricingPlan();
    this.handleCancel();
    if (typeof this.props.onDismiss === 'function') {
      this.props.onDismiss();
    }
  },

  handleAddSubmit() {
    ProfileBillingPlanDialogActions.submitPlan(this.getValidatorAttributes());
  },

  handleEditSubmit() {
    ProfileBillingPlanDialogActions.submitPlan(this.getValidatorAttributes());
  },

  handleDialogShow() {
    ProfileBillingPlanDialogActions.getBillingPlans();
    ProfileBillingPlanDialogActions.fetchBillingCard();
  },

  handleSliderChange(type, event, value) {
    ProfileBillingPlanDialogActions.sliderChange(type, value);
  },

  handleSliderOptionClick(value, type) {
    ProfileBillingPlanDialogActions.sliderChange(type, value);
  },

  renderFormNotificationsBlock() {
    const formNotifications = this.renderFormNotifications();

    if (formNotifications) {
      return (
        <div className="row vp-3-b">
          <div className="col-flex-1">{formNotifications}</div>
        </div>
      );
    }

    return null;
  },

  renderCard() {
    const styles = this.getStyles();
    const { router } = this.props;
    const { card, number, cardNiceType, exp_month, exp_year, cvc } = this.state;

    if (typeof card === 'undefined') {
      return <Loading show={true} />;
    }

    if (card) {
      return (
        <div>
          {this.renderFormNotificationsBlock()}
          <div style={styles.sectionTopic}>Credit card info:</div>
          <div
            className="row"
            style={{ marginTop: 20 }}
          >
            <div className="col-flex-1">
              <CreditCard card={card} />
            </div>
            <div
              className="col-flex-1"
              style={styles.sectionComment}
            >
              Want to use a different method of payment?<br />
              <a onClick={() => router.push('profile-billing-payment')}>Update your card</a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {this.renderFormNotificationsBlock()}

        <div className="row vp-3-b">
          <div className="col-flex-1">
            <div style={styles.sectionTopic}>Enter your credit card info:</div>
          </div>
        </div>
        <div className="row vm-2-b">
          <div className="col-flex-1">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontIcon
                className="synicon-lock"
                color="#FFFFFF"
                style={styles.synicon}
              />
              <p style={{ margin: 0, flex: 1, fontSize: 14 }}>
                This is a secure 256-bit SSL encrypted payment.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
              <FontIcon
                className="synicon-certificate"
                color="#FFFFFF"
                style={styles.synicon}
              />
              <p style={{ margin: 0, flex: 1, fontSize: 14 }}>
                30-day money back guarantee.<br />No contracts. Upgrade, downgrade, or cancel at any time.
              </p>
            </div>
          </div>
        </div>
        <CreditCardForm
          number={number}
          cardNiceType={cardNiceType}
          onCardNumberChange={this.onCardNumberChange}
          cardNumberErrorText={this.getValidationMessages('number').join(' ')}
          onCardMonthChange={(event, value) => this.setState({ exp_month: value })}
          cardMonthErrorText={this.getValidationMessages('exp_month').join(' ')}
          cardMonthValue={exp_month}
          onCardYearChange={(event, value) => this.setState({ exp_year: value })}
          cardYearErrorText={this.getValidationMessages('exp_year').join(' ')}
          cardYearValue={exp_year}
          onCardCVCChange={(event, value) => this.setState({ cvc: value })}
          cardCVCErrorText={this.getValidationMessages('cvc').join(' ')}
          cardCVCValue={cvc}
        />
      </div>
    );
  },

  renderSlider(type) {
    if (!this.state.plan) {
      return true;
    }

    const defaultValue = 0;
    const selected = this.state[`${type}Selected`];
    let options = this.state.plan.options[type];

    options = options.map((item) => `$${item}`);

    return (
      <Slider
        key={`${type}Slider`}
        ref={`${type}Slider`}
        name={`${type}Slider`}
        value={typeof selected !== 'undefined' ? selected : defaultValue}
        type={type}
        legendItems={options}
        onChange={this.handleSliderChange}
        optionClick={this.handleSliderOptionClick}
      />
    );
  },

  renderSliderSummary(info) {
    return (
      <div>
        <div style={{ paddingBottom: 8 }}>
          <div style={{ paddingBottom: 8 }}>{info.included.label}</div>
          <div><strong>{info.included.value}</strong></div>
        </div>
        <div>
          <div style={{ paddingBottom: 8 }}>{info.overage.label}</div>
          <div><strong>${info.overage.value}</strong></div>
        </div>
      </div>
    );
  },

  renderFeatures() {
    const styles = this.getStyles();
    const features = ProfileBillingPlanDialogStore.getFeatures();

    if (!features) {
      return null;
    }

    return (
      <List
        style={{
          marginTop: -16,
          marginBottom: -8,
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        {features.map((feature) => (
          <div style={{ flex: '0 0 50%' }}>
            <ListItem
              key={_.kebabCase(feature)}
              primaryText={feature}
              innerDivStyle={styles.listItemInnerDiv}
              disabled={true}
              leftIcon={
                <img
                  src={require('../../assets/img/check.svg')}
                  alt="check icon"
                  style={styles.listItemIcon}
                />
              }
            />
          </div>
        ))}
      </List>
    );
  },

  render() {
    const styles = this.getStyles();
    const { canSubmit } = this.state;
    const apiInfo = ProfileBillingPlanDialogStore.getInfo('api');
    const cbxInfo = ProfileBillingPlanDialogStore.getInfo('cbx');
    const sum = parseInt(apiInfo.total, 10) + parseInt(cbxInfo.total, 10);
    const isSelectedPricingPlan = ProfileBillingPlanDialogStore.isSelectedPricingPlan();
    const selectedPricingPlanName = ProfileBillingPlanDialogStore.getSelectedPricingPlanName();
    const dialogCustomActions = [
      <div style={isSelectedPricingPlan && styles.narrowWrapper}>
        <RaisedButton
          key="confirm"
          label="Purchase"
          primary={true}
          onTouchTap={this.handleFormValidation}
          ref="submit"
          disabled={!canSubmit}
          data-e2e="confirm-button"
        />
      </div>
    ];
    const apiSliderSummary = this.renderSliderSummary(
      {
        included: {
          value: parseInt(apiInfo.included, 10).toLocaleString(),
          label: 'Total API calls'
        },
        overage: {
          value: apiInfo.overage,
          label: 'Overage Unit Price: API Calls'
        }
      }
    );
    const cbxSliderSummary = this.renderSliderSummary(
      {
        included: {
          value: parseInt(cbxInfo.included, 10).toLocaleString(),
          label: 'Total Script seconds'
        },
        overage: {
          value: cbxInfo.overage,
          label: 'Overage Unit Price: Script second'
        }
      }
    );
    let paymentComment = `Your monthly billing cycle will start on the 1st day of every month. Your payment for the
      current month will be prorated and charged immediately.`;

    if (ProfileBillingPlanStore.getPlanTotalValue()) {
      paymentComment = 'We will charge your new monthly Plan price when the next billing period starts.';
    }

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        actions={dialogCustomActions}
        open={this.state.open}
        isLoading={this.state.isLoading}
        onRequestClose={this.handleDismiss}
      >
        <Show if={!isSelectedPricingPlan}>
          <div>
            <div style={{ fontSize: '1.5em', lineHeight: '1.5em' }}>Choose your plan</div>
            <div style={{ color: '#9B9B9B' }}>move the sliders to choose your plan</div>
          </div>
          <div style={{ paddingTop: 34 }}>
            <Slider.Section
              title="API calls"
              slider={this.renderSlider('api')}
              sliderSummary={apiSliderSummary}
            />
            <Slider.Section
              style={{ paddingTop: 50 }}
              title="Script seconds"
              slider={this.renderSlider('cbx')}
              sliderSummary={cbxSliderSummary}
            />
            <div className="row" style={{ marginTop: 40 }}>
              <div className="col-md-24">
                <div style={styles.sectionTopic}>Summary</div>
                <div style={styles.table}>
                  <div
                    className="row"
                    style={styles.tableRow}
                  >
                    <div className="col-flex-1">
                      API calls
                    </div>
                    <div
                      className="col-md-10"
                      style={styles.tableColumnSummary}
                    >
                      {parseInt(apiInfo.included, 10).toLocaleString()}
                    </div>
                    <div className="col-md-10" style={styles.tableColumnSummary}>
                      ${apiInfo.total}/Month
                    </div>
                  </div>
                  <div className="row" style={styles.tableRow}>
                    <div className="col-flex-1">
                      Script seconds
                    </div>
                    <div
                      className="col-md-10"
                      style={styles.tableColumnSummary}
                    >
                      {parseInt(cbxInfo.included, 10).toLocaleString()}
                    </div>
                    <div
                      className="col-md-10"
                      style={styles.tableColumnSummary}
                    >
                      ${cbxInfo.total}/Month
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 30 }}>
                  {this.renderCard()}
                </div>
              </div>
              <div className="col-md-11" style={{ paddingLeft: 35 }}>
                <div style={styles.sectionTopic}>New plan:</div>
                <div style={{ marginTop: 20, background: '#CBEDA5' }}>
                  <div style={styles.sectionTotalSummary}>
                    <div><strong>${sum}</strong>/month</div>
                    <div>+ overage</div>
                  </div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <div style={styles.sectionComment}>
                    {paymentComment}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Show>

        <Show if={isSelectedPricingPlan}>
          <div style={styles.narrowWrapper}>
            <div className="row vp-5-b">
              <div className="col-1-flex">
                <div style={styles.title}>Summary of your order</div>
              </div>
            </div>
            <div className="row vp-3-b">
              <div className="col-1-flex">
                <div style={styles.sectionTopic}>
                  Your <strong>{selectedPricingPlanName}</strong> plan includes:
                </div>
              </div>
            </div>
            <div className="row vp-2-b">
              <div className="col-1-flex">
                {this.renderFeatures()}
              </div>
            </div>
            <div className="row vp-2-b">
              <div className="col-1-flex">
                <Paper>
                  <Table selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                      <TableRow>
                        <TableRowColumn style={styles.tableRowColumn}>
                          {_.toUpper(numeral(apiInfo.included).format('0 a'))} API calls
                        </TableRowColumn>
                        <TableRowColumn style={styles.tableRowColumn}>
                          ${apiInfo.total} / Month
                        </TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn style={styles.tableRowColumn}>
                          {_.toUpper(numeral(cbxInfo.included).format('0 a'))} Script seconds
                        </TableRowColumn>
                        <TableRowColumn style={styles.tableRowColumn}>
                          ${cbxInfo.total} / Month
                        </TableRowColumn>
                      </TableRow>
                      <TableRow style={styles.tableFooterRow}>
                        <TableRowColumn style={styles.tableRowColumn}>
                          Total:
                        </TableRowColumn>
                        <TableRowColumn style={styles.tableRowColumn}>
                          ${sum} / Month
                        </TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </div>
            </div>
            <div className="row vp-5-b">
              <div className="col-flex-1">
                <div style={styles.sectionComment}>
                  {paymentComment} Overage unit price is ${apiInfo.overage} for API Call and ${cbxInfo.overage} for
                  Script second.
                </div>
              </div>
            </div>

            <div className="row vp-5-b">
              <div className="col-flex-1">
                {this.renderCard()}
              </div>
            </div>
          </div>
        </Show>
      </Dialog.FullPage>
    );
  }
});

export default withRouter(ProfileBillingPlanDialog);
