import React, { Component } from 'react';

import SessionStore from '../apps/Session/SessionStore';

import AlertPageContent from '../common/AlertPageContent';

class ExpiredAccount extends Component {
  componentDidMount() {
    console.log('SessionStore.clearInvalidRouteMode();');
    SessionStore.clearInvalidRouteMode();
  }

  render() {
    return (
      <AlertPageContent
        imgSrc={'/img/illustrations/no-active-plan.svg'}
        headline="No active subscription"
        message={`Oh no! Your subscription has expired. Simply upgrade your account for access to all of Syncano’s
          features.`}
        buttonLinkTo="profile-billing-plan"
        buttonLabel="Upgrade My Plan"
        buttonDescription="(Plans start as low as $25)"
      />
    );
  }
}

export default ExpiredAccount;
