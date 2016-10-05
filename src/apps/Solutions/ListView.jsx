import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

// Stores and Actions
import Store from './ListViewStore';
import Actions from './ListViewActions';
import SessionStore from '../Session/SessionStore';

// Components
import { List, ListItem, Divider, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Container, Loading, Tags, Show, Solutions, InnerToolbar, Sidebar } from '../../common/';

import CreateDialog from './CreateDialog';
import CreateDialogActions from './CreateDialogActions';
import InstallDialog from './InstallDialog';
import InstallDialogActions from './InstallDialogActions';

const SolutionsListView = React.createClass({
  displayName: 'SolutionsListView',

  mixins: [Reflux.connect(Store)],

  componentDidMount() {
    console.info('Solutions::componentWillMount');
    Actions.fetch();
  },

  getStyles() {
    return {
      listItemChecked: {
        background: Colors.lightBlue50
      }
    };
  },

  handleClickSeeMore(solutionId) {
    const { router } = this.props;

    router.push(`/solutions/${solutionId}/edit`);
  },

  render() {
    const { filter, tags, selectedTags, items } = this.state;
    const styles = this.getStyles();

    return (
      <div id="solutions">
        <Helmet title="Solutions Market" />
        <div className="row">
          <Sidebar>
            <List className="vm-3-b">
              <ListItem
                innerDivStyle={filter === 'public' ? styles.listItemChecked : {}}
                primaryText="All solutions"
                onTouchTap={() => Actions.setFilter('public')}
              />
              <Divider />
              <ListItem
                innerDivStyle={filter === 'starred_by_me' ? styles.listItemChecked : {}}
                primaryText="Favorite"
                onTouchTap={() => Actions.setFilter('starred_by_me')}
              />
              <ListItem
                innerDivStyle={filter === 'created_by_me' ? styles.listItemChecked : {}}
                primaryText="My solutions"
                onTouchTap={() => Actions.setFilter('created_by_me')}
              />
            </List>
            <Tags.List
              items={tags}
              selectedItems={selectedTags}
              toggleTagSelection={(name) => Actions.toggleTagSelection(name)}
              resetTagsSelection={Actions.resetTagsSelection}
            />
          </Sidebar>
          <div className="col-flex-1">
            <InnerToolbar>
              <Show if={SessionStore.isFriendlyUser()}>
                <RaisedButton
                  label="Add"
                  primary={true}
                  style={{ marginRight: 0 }}
                  onTouchTap={CreateDialogActions.showDialog}
                />
              </Show>
            </InnerToolbar>
            <Container>
              <Loading show={!items}>
                <Solutions.List
                  items={items}
                  onInstall={(solutionId) => InstallDialogActions.showDialogWithPreFetch(solutionId)}
                  onSeeMore={this.handleClickSeeMore}
                  onTagClick={(tag) => Actions.selectOneTag(tag)}
                  onUnstar={(solutionId) => Actions.unstarSolution(solutionId)}
                  onStar={(solutionId) => Actions.starSolution(solutionId)}
                />
              </Loading>
            </Container>
          </div>
        </div>
        <CreateDialog />
        <InstallDialog />
      </div>
    );
  }
});

export default withRouter(SolutionsListView);
