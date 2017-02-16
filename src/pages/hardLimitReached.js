import React from 'react';
import AlertPageContent from '../common/AlertPageContent';

export default () => (
  <AlertPageContent
    imgSrc={require('../assets/img/illustrations/no-active-plan.svg')}
    headline="Hard limits reached"
    message={`Oh no! You have reached you hard limit. Simply upgrade your account for access to all of
      Syncano’s features.`}
    buttonLinkTo="profile-billing-plan"
    buttonLabel="Upgrade My Plan"
    buttonDescription="(Plans start as low as $25)"
  />
);
