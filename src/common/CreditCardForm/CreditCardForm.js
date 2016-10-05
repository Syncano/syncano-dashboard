import React, { Component } from 'react';
import InputMask from 'react-input-mask';

import { TextField } from 'material-ui';

import { PaymentIcons } from '../';
import CreditCardFormNumberInput from './CreditCardFormNumberInput';

class CreditCardForm extends Component {
  render() {
    const {
      number,
      cardNiceType,
      onCardNumberChange,
      cardNumberErrorText,
      onCardMonthChange,
      cardMonthErrorText,
      cardMonthValue,
      onCardYearChange,
      cardYearErrorText,
      cardYearValue,
      onCardCVCChange,
      cardCVCErrorText,
      cardCVCValue
    } = this.props;

    return (
      <div>
        <div className="row">
          <PaymentIcons
            number={number}
            cardNiceType={cardNiceType}
          />
        </div>
        <div className="row">
          <div className="col-flex-1">
            <CreditCardFormNumberInput
              number={number}
              cardNiceType={cardNiceType}
              ref="number"
              name="number"
              autoFocus={true}
              fullWidth={true}
              floatingLabelText="Card Number"
              onChange={onCardNumberChange}
              errorText={cardNumberErrorText}
              dataStripe="number"
            />
          </div>
        </div>
        <div className="row vm-4-b">
          <div className="col-flex-2">
            <TextField
              ref="exp_month"
              name="exp_month"
              maxLength={2}
              fullWidth={true}
              floatingLabelText="Expiration month"
              hintText="MM"
              onChange={onCardMonthChange}
              errorText={cardMonthErrorText}
              dataStripe="exp-month"
            >
              <InputMask
                mask="99"
                maskChar=""
                value={cardMonthValue}
                data-e2e="card-month-input"
              />
            </TextField>
          </div>
          <div className="col-flex-2">
            <TextField
              ref="exp_year"
              name="exp_year"
              maxLength={2}
              fullWidth={true}
              floatingLabelText="Expiration year"
              hintText="YY"
              onChange={onCardYearChange}
              errorText={cardYearErrorText}
              dataStripe="exp-year"
            >
              <InputMask
                mask="99"
                maskChar=""
                value={cardYearValue}
                data-e2e="card-year-input"
              />
            </TextField>
          </div>
          <div className="col-flex-1">
            <TextField
              ref="cvc"
              name="cvc"
              maxLength={4}
              fullWidth={true}
              floatingLabelText="CVC"
              onChange={onCardCVCChange}
              errorText={cardCVCErrorText}
              dataStripe="cvc"
            >
              <InputMask
                mask="9999"
                maskChar=""
                value={cardCVCValue}
                data-e2e="card-cvc-input"
              />
            </TextField>
          </div>
        </div>
      </div>
    );
  }
}

export default CreditCardForm;
