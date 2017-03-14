import React from 'react';
import _ from 'lodash';
import PaymentIcon from '../PaymentIcon';

const PaymentIcons = ({ number, cardNiceType }) => {
  const styles = {
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
  const paymentIcons = [
    'Visa',
    'MasterCard',
    'American Express',
    'Discover',
    'Diners Club',
    'JCB'
  ];
  const renderPaymentIcons = () => _.map(paymentIcons, (icon) => {
    let iconStyles = styles.paymentIcon;

    if (number && cardNiceType && icon !== cardNiceType) {
      iconStyles = { ...styles.paymentIcon, ...styles.paymentIconHidden };
    }

    return (
      <PaymentIcon
        niceType={icon}
        style={iconStyles}
      />
    );
  });

  return (
    <div
      className="col-flex-1"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {renderPaymentIcons()}
      <img
        src={require('../../assets/img/stripe-badge@3x.png')}
        alt="Powered by Stripe"
        style={{ display: 'block', height: 78 / 3, marginLeft: 'auto' }}
      />
    </div>
  );
};

export default PaymentIcons;
