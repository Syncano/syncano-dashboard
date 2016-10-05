import React from 'react';
import AlertPageContent from '../common/AlertPageContent';

export default () => (
  <AlertPageContent
    imgSrc={'/img/illustrations/no-active-plan.svg'}
    headline="No active subscription"
    message={`Oh no! Your subscription has expired. Simply upgrade your account for access to all of
      Syncano’s features.`}
    buttonLinkTo="profile-billing-plan"
    buttonLabel="Upgrade My Plan"
    buttonDescription="(Plans start as low as $25)"
  />
);
