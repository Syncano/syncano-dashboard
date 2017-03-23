import React from 'react';
import { Route, Redirect, IndexRedirect, IndexRoute } from 'react-router';

import { RoutesUtil } from './utils';

// Pages
import AppPage from './pages/app';
import ClassesPage from './pages/classes';
import DashboardPage from './pages/dashboard';
import InstancePage from './pages/instance';
import ProfilePage from './pages/profile';
import ScriptsPage from './pages/scripts';
import SetupPage from './pages/setup';
import NotFoundPage from './pages/notfound';
import PushDevicesPage from './pages/pushDevices';
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
import BackupAndRestore from './apps/BackupAndRestore';
import ChannelHistory from './apps/ChannelHistory';
import Channels from './apps/Channels';
import Classes from './apps/Classes';
import CustomSockets from './apps/CustomSockets';
import ScriptEndpoints from './apps/ScriptEndpoints';
import Script from './apps/Script';
import Scripts from './apps/Scripts';
import DataObjects from './apps/DataObjects/DataObjects';
import DataEndpoints from './apps/DataEndpoints';
import Users from './apps/Users/Users';
import Sockets from './apps/Sockets';
import Snippets from './apps/Snippets';
import Template from './apps/Template';
import Templates from './apps/Templates';
import Triggers from './apps/Triggers';
import Schedules from './apps/Schedules';
import PushNotifications from './apps/PushNotifications';
import PushDevices from './apps/PushDevices';
import Usage from './apps/Usage';
import PushMessages from './apps/PushMessages';
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
        name="instance"
        onEnter={RoutesUtil.checkInstanceActiveSubscription}
        component={InstancePage}
        path="instances/:instanceName"
      >

        {/* Sockets */}
        <Route
          name="sockets"
          path="sockets"
          component={Sockets}
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

        {/* Data */}
        <Route
          name="data"
          path="data-endpoints"
        >
          <Route
            name="data-endpoints-preview"
            path=":dataEndpointName/preview"
            component={DataEndpoints.Preview}
          />

          <IndexRoute component={DataEndpoints} />
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
          name="custom-sockets"
          path="custom-sockets"
        >
          <Route
            name="custom-socket-detail"
            path=":customSocketName"
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

        {/* Push Notifications */}
        <Route
          name="push-notifications"
          path="push-notifications"
        >

          <Route
            name="push-notification-config"
            path="config"
            component={PushNotifications}
          />

          {/* Push Notification Devices */}
          <Route
            name="push-notification-devices"
            path="devices"
            component={PushDevicesPage}
          >
            <Route
              name="all-push-notification-devices"
              path="all"
              component={PushDevices.AllDevices}
            />
            <Route
              name="apns-devices"
              path="apns"
              component={PushDevices.APNS}
            />
            <Route
              name="gcm-devices"
              path="gcm"
              component={PushDevices.GCM}
            />
            <Redirect
              from="/instances/:instanceName/push-notifications/devices"
              to="all-push-notification-devices"
            />
          </Route>

          <Route
            name="push-notification-messages"
            path="messages"
            component={PushMessages}
          >
            <Route
              name="all-push-notification-messages"
              path="all"
              component={PushMessages.AllList}
            />
            <Route
              name="apns-messages"
              path="apns"
              component={PushMessages.APNSList}
            />
            <Route
              name="gcm-messages"
              path="gcm"
              component={PushMessages.GCMList}
            />
            <Redirect
              from="/instances/:instanceName/push-notifications/messages"
              to="all-push-notification-messages"
            />
          </Route>

          <IndexRedirect to="/instances/:instanceName/push-notifications/config/" />
        </Route>

        {/* Backup & Restore */}
        <Route
          name="backup-and-restore"
          path="backup-and-restore"
          component={BackupAndRestore}
        >
          <Route
            name="full-backups"
            path="full"
            component={BackupAndRestore.Full}
          />

          <IndexRoute component={BackupAndRestore.Full} />
        </Route>


        {/* ScriptEndpoints */}
        <Route
          name="script-endpoints"
          path="script-endpoints"
        >


          {/* ScriptEndpoints Traces */}
          <Route
            name="scriptEndpoint-traces"
            component={ScriptEndpoints.Traces}
            path=":scriptEndpointName/traces"
          />

          <IndexRoute component={ScriptEndpoints} />

        </Route>

        <Route
          name="snippets"
          path="snippets"
          component={Snippets}
        />

        {/* Templates */}
        <Route
          name="templates"
          path="templates"
        >
          <Route
            name="template"
            component={Template}
            path=":templateName"
          />
          <IndexRoute component={Templates} />
        </Route>

        {/* Scripts */}
        <Route
          name="scripts"
          component={ScriptsPage}
          path="scripts"
        >
          <Route
            name="script"
            component={Script}
            path=":scriptId"
          />
          <IndexRoute component={Scripts} />
        </Route>
        <Route
          name="scripts-add"
          component={Scripts}
          path="scripts/:action"
        />

        {/* Data Objects */}
        <Route
          name="data-objects"
          component={DataObjects}
          path="objects"
        />

        {/* Triggers */}
        <Route
          name="triggers"
          path="triggers"
        >

          <Route
            name="trigger-traces"
            component={Triggers.Traces}
            path=":triggerId/traces"
          />

          <IndexRoute component={Triggers} />
        </Route>

        {/* Schedules */}
        <Route
          name="schedules"
          path="schedules"
        >

          <Route
            name="schedule-traces"
            component={Schedules.Traces}
            path=":scheduleId/traces"
          />

          <IndexRoute component={Schedules} />
        </Route>

        {/* Channels */}
        <Route
          name="channels"
          path="channels"
        >
          <Route
            name="channel-history"
            component={ChannelHistory.Messages}
            path=":channelName/history"
          />

          <IndexRoute component={Channels} />
        </Route>

        {/* Users */}
        <Route
          name="users"
          component={Users}
          path="users"
        />

        <IndexRedirect to="sockets" />
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

      <IndexRoute
        onEnter={RoutesUtil.checkInstanceActiveSubscription}
        component={Instances}
      />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
