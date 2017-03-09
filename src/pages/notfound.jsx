import React from 'react';
import AlertPageContent from '../common/AlertPageContent';

const NotFound = () => (
  <AlertPageContent
    imgSrc={require('../assets/img/illustrations/undergoing-maintenance.svg')}
    headline="Not found"
    message="The page you were looking for doesn't exist."
    buttonLinkTo="dashboard"
    buttonLabel="Go to Dashboard"
  />
);

export default NotFound;
