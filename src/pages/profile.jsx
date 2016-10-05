import React from 'react';
import { Sidebar } from '../common/';

const Profile = ({ children }) => (
  <div className="row">
    <Sidebar>
      <Sidebar.List
        key="Main Settings"
        subheader="Main Settings"
      >
        <Sidebar.LinkListItem
          key="Profile"
          routeName="profile-settings"
          primaryText="Profile"
        />
        <Sidebar.LinkListItem
          key="Authentication"
          routeName="profile-authentication"
          primaryText="Authentication"
        />
        <Sidebar.LinkListItem
          key="Invitations"
          routeName="profile-invitations"
          primaryText="Invitations"
        />
      </Sidebar.List>
      <Sidebar.List
        key="Billing"
        subheader="Billing"
      >
        <Sidebar.LinkListItem
          key="Billing plan"
          routeName="profile-billing-plan"
          primaryText="Plans & Pricing"
        />
        <Sidebar.LinkListItem
          key="Usage"
          routeName="profile-billing-usage"
          primaryText="Usage"
        />
        <Sidebar.LinkListItem
          key="Payment methods"
          routeName="profile-billing-payment"
          primaryText="Payment Methods"
        />
        <Sidebar.LinkListItem
          key="Invoices"
          routeName="profile-billing-invoices"
          primaryText="Invoices"
        />
        <Sidebar.LinkListItem
          key="Billing address"
          routeName="profile-billing-address"
          primaryText="Billing Address"
        />
      </Sidebar.List>
    </Sidebar>
    <div className="col-flex-1" style={{ maxWidth: 'calc(100% - 256px)' }}>
      {children}
    </div>
  </div>
);

export default Profile;
