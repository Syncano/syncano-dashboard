import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

// Utils
import { DialogsMixin } from '../../mixins';

// Stores and Actions
import Actions from './ProfileInvitationsActions';
import Store from './ProfileInvitationsStore';

// Components
import ProfileInvitationsList from './ProfileInvitationsList';
import { Container, Show, Loading, InnerToolbar } from '../../common/';

export default React.createClass({
  displayName: 'ProfileInvitations',

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('ProfileInvitations::componentDidMount');
    Actions.fetch();
  },

  render() {
    const { items, isLoading, hideDialogs } = this.state;
    const title = 'Invitations';

    return (
      <div>
        <Helmet title={title} />
        <InnerToolbar title={title} />
        <Container>
          <Loading show={isLoading}>
            <Show if={items.length < 1}>
              <Container.Empty
                icon="synicon-email-outline"
                text="You have no invitations"
              />
            </Show>

            <Show if={items.length > 0}>
              <ProfileInvitationsList
                name="Profile Invitations"
                isLoading={isLoading}
                items={items}
                hideDialogs={hideDialogs}
              />
            </Show>
          </Loading>
        </Container>
      </div>
    );
  }
});
