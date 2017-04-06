import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import Actions from './UsersActions';
import Store from './UsersStore';
import { GroupsActions, GroupsStore, GroupsList } from './../Groups';

import { RaisedButton } from 'material-ui';
import { Container, InnerToolbar, Lists, Show } from '../../common/';

import UsersList from './UsersList';

export default React.createClass({
  displayName: 'Users',

  mixins: [
    Reflux.connect(Store, 'users'),
    Reflux.connect(GroupsStore, 'groups')
  ],

  componentDidMount() {
    Actions.fetch();
    GroupsActions.fetch();
  },

  handleMoreRows() {
    const { nextParams } = this.state.users;

    Actions.subFetchUsers(nextParams);
  },

  render() {
    const { groups, users } = this.state;

    return (
      <div>
        <Helmet title="Users & Groups" />
        <InnerToolbar title="Users & Groups" />
        <Container>
          <Lists.Container className="row">
            <div className="col-md-8">
              <GroupsList
                isLoading={groups.isLoading}
                items={groups.items}
                hideDialogs={groups.hideDialogs}
              />
            </div>
            <div className="col-md-27">
              <UsersList
                isLoading={users.isLoading}
                items={users.items}
                hideDialogs={users.hideDialogs}
              />
              <Show if={!users.isLoading}>
                <div
                  className="row align-center"
                  style={{ margin: 50 }}
                >
                  <div>Loaded {users.items.length} Users</div>
                </div>
                <Show if={users.hasNextPage}>
                  <div
                    className="row align-center"
                    style={{ margin: 50 }}
                  >
                    <RaisedButton
                      label="Load more"
                      onClick={this.handleMoreRows}
                    />
                  </div>
                </Show>
              </Show>
            </div>
          </Lists.Container>
        </Container>
      </div>
    );
  }
});
