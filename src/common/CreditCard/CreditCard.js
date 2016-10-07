import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

import PaymentIcon from '../PaymentIcon';

export default Radium(React.createClass({
  displayName: 'CreditCard',

  getStyles() {
    return {
      cardContainer: {
        width: 220,
        height: 138,
        background: '#fafafa',
        border: '1px solid #ddd',
        borderRadius: 10,
        padding: 16,
        color: 'rgba(0, 0, 0, 0.87)',
        display: 'flex',
        flexDirection: 'column'
      },
      cardHeadline: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 12,
        lineHeight: '16px'
      },
      cardFooter: {
        display: 'flex',
        margin: 'auto 0 0',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      },
      cardIcon: {
        width: 60,
        height: 'auto',
        display: 'block',
        transform: 'translateY(18%)'
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const { card } = this.props;
    const { last4, exp_month, exp_year, brand } = card;

    return (
      <div
        data-e2e="filled-out-card"
        style={styles.cardContainer}
      >
        <div>
          <div style={styles.cardHeadline}>Card number</div>
          <div data-e2e="payment-card-visible-digits">**** **** **** {last4}</div>
        </div>
        <div style={styles.cardFooter}>
          <div>
            <div style={styles.cardHeadline}>Expires on</div>
            {_.padStart(exp_month, 2, '0')}/{_.slice(String(exp_year), -2)}
          </div>
          <div>
            <PaymentIcon
              niceType={brand}
              style={styles.cardIcon}
            />
          </div>
        </div>
      </div>
    );
  }
}));
