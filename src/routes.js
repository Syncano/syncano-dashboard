import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import { RoutesUtil } from './utils';

// Pages
import AppPage from './pages/app';
import ClassesPage from './pages/classes';
import DashboardPage from './pages/dashboard';
import InstancePage from './pages/instance';
import ProfilePage from './pages/profile';
import SetupPage from './pages/setup';
import NotFoundPage from './pages/notfound';
import ExpiredAccountPage from './pages/expiredAccount';
import FailedPaymentPage from './pages/failedPayment';
import FreeLimitsExceededPage from './pages/freeLimitsExceeded';
import hardLimitReachedPage from './pages/hardLimitReached';
import MaintenancePage from './pages/maintenance';

// Apps
import Account from './apps/Account';
import Profile from './apps/Profile';

// Apps for authenticated users
import Instances from './apps/Instances/Instances';
import InstanceEdit from './apps/Instances/InstanceEdit';

// Instance Apps
import Admins from './apps/Admins/Admins';
import ApiKeys from './apps/ApiKeys/ApiKeys';
import Classes from './apps/Classes';
import CustomSockets from './apps/CustomSockets';
import SocketsRegistry from './apps/SocketsRegistry';
import DataObjects from './apps/DataObjects/DataObjects';
import Users from './apps/Users/Users';
import Sockets from './apps/Sockets';
import Usage from './apps/Usage';
import Hosting from './apps/Hosting';

const handleAppEnter = (nextState, replace) => RoutesUtil.onAppEnter(nextState, replace);
const handleDashboardEnter = (nextState, replace) => RoutesUtil.onDashboardEnter(nextState, replace);
const handleDashboardChange = (prevState, nextState, replace) => (
  RoutesUtil.onDashboardChange(prevState, nextState, replace)
);

export default (
  <Route
    name="app"
    component={AppPage}
    onEnter={handleAppEnter}
    path="/"
  >
    <Route
      name="login"
      path="login"
      component={Account.Login}
      onEnter={RoutesUtil.redirectToDashboard}
    />
    <Route
      name="signup"
      path="signup"
      component={Account.Signup}
      onEnter={RoutesUtil.redirectToDashboard}
    />
    <Route
      name="setup"
      component={SetupPage}
      path="setup"
    />
    <Route
      name="activate"
      component={Account.Activate}
      path="/activate/:uid/:token"
    />
    <Route
      name="password-update"
      component={Account.PasswordUpdate}
      path="/password/update"
    />
    <Route
      name="password-reset"
      component={Account.PasswordReset}
      path="/password/reset"
    />
    <Route
      name="password-reset-confirm"
      component={Account.PasswordResetConfirm}
      path="/password/reset/:uid/:token"
    />

    {/* Dashboard */}
    <Route
      name="dashboard"
      component={DashboardPage}
      onEnter={handleDashboardEnter}
      onChange={handleDashboardChange}
    >
      <Route
        name="instances"
        component={Instances}
        path="instances"
      />

      <Route
        name="expired-account"
        component={ExpiredAccountPage}
        path="expired"
      />

      <Route
        name="failed-payment"
        component={FailedPaymentPage}
        path="failed-payment"
      />

      <Route
        name="free-limits-exceeded"
        component={FreeLimitsExceededPage}
        path="free-limits-exceeded"
      />

      <Route
        name="hard-limits-reached"
        component={hardLimitReachedPage}
        path="hard-limits-reached"
      />

      <Route
        name="maintenance"
        component={MaintenancePage}
        path="maintenance"
      />

      <Route
        name="socket-details"
        component={Sockets.Details}
        path="instances/:instanceName/sockets/:socketId"
      />

      <Route
        name="instance"
        onEnter={RoutesUtil.checkInstanceActiveSubscription}
        component={InstancePage}
        path="instances/:instanceName"
      >

        {/* Sockets */}
        <Route
          name="sockets"
          component={Sockets}
          path="sockets"
        />

        {/* Hosting */}
        <Route
          name="hosting"
          path="hosting"
        >
          <Route
            name="list"
            path="list"
            component={Hosting}
          />
          <Route
            name="files"
            path=":hostingId/files"
            component={Hosting.Files}
          />

          <IndexRoute component={Hosting} />
        </Route>

        {/* Admins */}
        <Route
          name="admins"
          component={Admins}
          path="admins"
        />

        {/* API keys */}
        <Route
          name="api-keys"
          component={ApiKeys}
          path="api-keys"
        />

        {/* Custom Sockets */}
        <Route
          name="my-sockets"
          path="my-sockets"
        >
          <Route
            name="my-socket-endpoints"
            path=":socketName"
            component={CustomSockets.Endpoints}
          />
          <IndexRoute component={CustomSockets} />
        </Route>

        {/* General */}
        <Route
          name="instance-edit"
          component={InstanceEdit}
          path="edit"
        />

        {/* Classes */}
        <Route
          name="classes"
          component={ClassesPage}
          path="classes"
        >

          <Route
            name="classes-data-objects"
            component={DataObjects}
            path=":className/objects"
          />

          <Route
            name="classEdit"
            component={Classes}
            path=":className/:action"
          />

          <IndexRoute component={Classes} />
        </Route>

        {/* Data Objects */}
        <Route
          name="data-objects"
          component={DataObjects}
          path="objects"
        />

        {/* Users */}
        <Route
          name="users"
          component={Users}
          path="users"
        />

        <IndexRedirect to="my-sockets" />
      </Route>

      {/* Profile Billing */}
      <Route
        name="profile"
        component={ProfilePage}
        path="/account"
      >
        <Route
          name="profile-billing-plan-cancel"
          component={Profile.BillingPlanCancel}
          path="plan/cancel"
        />
        <Route
          name="profile-billing-plan"
          component={Profile.BillingPlan}
          path="plan(/:mode)"
        />
        <Route
          name="profile-billing-usage"
          component={Usage}
          path="usage"
        />
        <Route
          name="profile-billing-address"
          component={Profile.BillingAddress}
          path="address"
        />
        <Route
          name="profile-billing-payment"
          component={Profile.BillingPayment}
          path="payment-methods"
        />
        <Route
          name="profile-billing-invoices"
          component={Profile.BillingInvoices}
          path="invoices"
        />
        <Route
          name="profile-settings"
          component={Profile.Settings}
          path="/account"
        />
        <Route
          name="profile-authentication"
          component={Profile.Authentication}
          path="/account/authentication"
        />
        <Route
          name="profile-invitations"
          component={Profile.Invitations}
          path="/account/invitations"
        />

        <IndexRoute component={Profile.Settings} />
      </Route>

      {/* Custom Sockets Registry */}
      <Route
        name="sockets-registry"
        component={SocketsRegistry}
        path="sockets-registry"
      >
        <Route
          name="sockets-registry-details"
          component={SocketsRegistry.Details}
          path=":socketId/details"
        />
        <IndexRoute component={SocketsRegistry.List} />
      </Route>

      <IndexRoute
        onEnter={RoutesUtil.checkInstanceActiveSubscription}
        component={Instances}
      />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
