import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './AdminsActions';
import Store from './AdminsStore';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import AdminsInvitationsStore from './AdminsInvitationsStore';

// Components
import { RaisedButton } from 'material-ui';
import { Container, InnerToolbar } from '../../common/';

// Local components
import AdminsList from './AdminsList';
import AdminsInvitationsList from './AdminsInvitationsList';
import AdminDialog from './AdminDialog';

export default React.createClass({
  displayName: 'Admins',

  mixins: [
    Reflux.connect(Store, 'admins'),
    Reflux.connect(AdminsInvitationsStore, 'invitations'),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('Admins::componentDidMount');
    Actions.fetch();
    AdminsInvitationsActions.fetch();
  },

  render() {
    const { admins, invitations } = this.state;
    const title = 'Administrators';

    return (
      <div>
        <Helmet title={title} />
        <AdminDialog />

        <InnerToolbar title={title}>
          <RaisedButton
            label="Invite"
            primary={true}
            style={{ marginRight: 0 }}
            onTouchTap={Actions.showDialog}
          />
        </InnerToolbar>

        <Container>
          <AdminsList
            isLoading={admins.isLoading}
            hideDialogs={admins.hideDialogs}
            items={admins.items}
          />

          <AdminsInvitationsList
            isLoading={invitations.isLoading}
            hideDialogs={invitations.hideDialogs}
            items={AdminsInvitationsStore.getPendingInvitations()}
          />
        </Container>
      </div>
    );
  }
});
