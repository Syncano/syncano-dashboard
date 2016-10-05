import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import _ from 'lodash';
import Helmet from 'react-helmet';
import valid from 'card-validator';

import { DialogsMixin, FormMixin } from '../../mixins';

import Actions from './ProfileActions';
import Store from './ProfileBillingPaymentStore';

import { FontIcon, RaisedButton } from 'material-ui';
import { CreditCardForm, Container, CreditCard, Dialog, Show, Loading, InnerToolbar } from '../../common/';

export default Radium(React.createClass({
  displayName: 'ProfileBillingPayment',

  mixins: [
    Reflux.connect(Store),
    DialogsMixin,
    FormMixin
  ],

  validatorConstraints: {
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
  },

  componentDidMount() {
    Actions.fetchBillingCard();
  },

  getStyles() {
    return {
      container: {
        maxWidth: 500
      },
      synicon: {
        fontSize: 20,
        background: '#4CAF50',
        color: '#FFFFFF',
        padding: '3px 4px',
        borderRadius: 3,
        marginRight: 10
      },
      secureMessageContent: {
        margin: 0,
        display: 'flex',
        alignItems: 'center'
      },
      sectionComment: {
        fontSize: 14,
        lineHeight: '1.5em',
        color: '#AAA'
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

  handleSuccessfullValidation(data) {
    const { card } = this.state;
    const params = {
      number: data.number,
      cvc: data.cvc,
      exp_month: data.exp_month,
      exp_year: data.exp_year
    };

    if (_.isEmpty(card)) {
      return Actions.addBillingCard(params);
    }

    return Actions.updateBillingCard(params);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        groupName: 'Payment',
        key: 'deleteBillingCard',
        ref: 'deleteBillingCard',
        title: 'Remove Billing Card',
        handleConfirm: Actions.deleteBillingCard,
        modal: true,
        children: ['Are you sure you want to remove your billing card?']
      }
    }];
  },

  toggleForm(state) {
    this.setState({
      showForm: state,
      show_form: state
    });
  },

  render() {
    const styles = this.getStyles();
    const { isLoading, card, showForm, show_form, number, cardNiceType, exp_month, exp_year, cvc } = this.state;
    const title = 'Payment methods';
    const hasCard = !_.isEmpty(card);
    const displayForm = !hasCard || showForm === true || show_form === true;
    const formSubmitButtonLabel = hasCard ? 'Update payment' : 'Add payment';

    return (
      <Loading show={isLoading}>
        <Helmet title={title} />
        {this.getDialogs()}
        <InnerToolbar title={title} />
        <Container style={styles.container}>
          <Show if={displayForm}>
            <form
              onSubmit={this.handleFormValidation}
              acceptCharset="UTF-8"
              method="post"
            >
              {this.renderFormNotifications() && (
                <div className="row vp-3-b">
                  <div className="col-flex-1">{this.renderFormNotifications()}</div>
                </div>
              )}

              <div className="row vm-2-b">
                <div className="col-flex-1">
                  <p style={styles.secureMessageContent}>
                    <FontIcon
                      className="synicon-lock"
                      style={styles.synicon}
                    />
                    This is a secure 256-bit SSL encrypted payment.
                  </p>
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
              <div className="row">
                <div className="col-flex-1">
                  <Show if={hasCard}>
                    <RaisedButton
                      className="raised-button"
                      style={{ marginRight: 10 }}
                      label="Cancel"
                      onClick={() => this.toggleForm(false)}
                    />
                  </Show>
                  <RaisedButton
                    data-e2e="payment-add-button"
                    type="submit"
                    primary={true}
                    className="raised-button"
                    style={{ margin: '0 0 0 auto' }}
                    label={formSubmitButtonLabel}
                  />
                </div>
              </div>
            </form>
          </Show>

          <Show if={!displayForm}>
            <div>
              <div className="row">
                <div className="col-flex-1">
                  <CreditCard card={card} />
                </div>
              </div>
              <div className="row vm-3-t">
                <div className="col-flex-1">
                  <RaisedButton
                    data-e2e="payment-remove-button"
                    label="Remove payment"
                    style={{ marginRight: 10 }}
                    onClick={() => this.showDialog('deleteBillingCard', {})}
                  />
                  <RaisedButton
                    data-e2e="payment-update-button"
                    type="submit"
                    primary={true}
                    label="Update payment"
                    onClick={() => this.toggleForm(true)}
                  />
                </div>
              </div>
            </div>
          </Show>
        </Container>
      </Loading>
    );
  }
}));
