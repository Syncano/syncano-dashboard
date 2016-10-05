import React from 'react';
import InputMask from 'react-input-mask';

import { TextField } from 'material-ui';

const CreditCardFormNumberInput = (props) => {
  const { cardNiceType, number } = props;
  // theese has additional "9" digits to allow to paste longer card numbers when filled
  const maskExceptions = {
    'American Express': '9999 999999 9999999',
    'Diners Club': '9999 9999 9999 9999'
  };
  const mask = maskExceptions[cardNiceType] || '9999 9999 9999 9999';

  return (
    <TextField {...props}>
      <InputMask
        mask={mask}
        maskChar=""
        value={number}
        data-e2e="card-number-input"
      />
    </TextField>
  );
};

export default CreditCardFormNumberInput;
