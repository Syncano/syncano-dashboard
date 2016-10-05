import React from 'react';
import AlertPageContent from '../common/AlertPageContent';

export default () => (
  <AlertPageContent
    imgSrc={'/img/illustrations/we-cant-process-your-payment.svg'}
    headline="We can't process your payment"
    message={`Oh no! It looks like there’s an issue with your method of payment. Please update your credentials to get
      back to building amazing apps!`}
    buttonLinkTo="profile-billing-payment"
    buttonLabel="Update My Credit Card"
  />
);
