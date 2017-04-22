import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import Actions from './UsersActions';
import Store from './UsersStore';
import { GroupsActions, GroupsStore, GroupsList, GroupDialog } from './../Groups';

// Components
import { RaisedButton } from 'material-ui';
import { Container, InnerToolbar, Lists, Show } from '../../common/';

// Local components
import UsersList from './UsersList';
import UserDialog from './UserDialog';

export default React.createClass({
  displayName: 'Users',

  mixins: [
    Reflux.connect(Store, 'users'),
    Reflux.connect(GroupsStore, 'groups')
  ],

  componentDidMount() {
    console.info('Users::componentDidMount');
    Actions.fetch();
    GroupsActions.fetch();
  },

  getStyles() {
    return {
      button: {
        marginRight: 0,
        borderRadius: '4px',
        textTransform: 'none'
      }
    };
  },

  handleMoreRows() {
    const { nextParams } = this.state.users;

    Actions.subFetchUsers(nextParams);
  },

  showUserDialog(group) {
    /* eslint-disable */
    Actions.showDialog(undefined, group);
    /* eslint-enable */
  },

  showGroupDialog() {
    GroupsActions.showDialog();
  },

  render() {
    const { groups, users } = this.state;
    const styles = this.getStyles();

    return (
      <div>
        <Helmet title="Users & Groups" />
        <UserDialog />
        <GroupDialog />

        <InnerToolbar title="Users & Groups">
          <RaisedButton
            data-e2e="add-group-button"
            label="Add a Group"
            labelStyle={{ textTransform: 'none', color: '#436E1D' }}
            backgroundColor="#B8E986"
            style={styles.button}
            buttonStyle={{ borderRadius: '4px' }}
            onTouchTap={GroupsActions.showDialog}
          />
          <RaisedButton
            data-e2e="add-user-button"
            label="Add a User"
            labelStyle={{ textTransform: 'none', color: '#436E1D' }}
            backgroundColor="#B8E986"
            style={styles.button}
            buttonStyle={{ borderRadius: '4px' }}
            onTouchTap={() => this.showUserDialog(null)}
          />
        </InnerToolbar>

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
