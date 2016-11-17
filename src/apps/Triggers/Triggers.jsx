import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import { DialogsMixin } from '../../mixins';

import Actions from './TriggersActions';
import Store from './TriggersStore';
import ScriptsActions from '../Scripts/ScriptsActions';

import { RaisedButton } from 'material-ui';
import { Container, InnerToolbar } from '../../common/';
import TriggersList from './TriggersList';
import TriggerDialog from './TriggerDialog';

export default React.createClass({
  displayName: 'TriggerSockets',

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentWillMount() {
    Actions.fetch();
    ScriptsActions.fetch();
  },

  render() {
    const { isLoading, items, hideDialogs } = this.state;

    return (
      <div>
        <Helmet title="Triggers" />
        <TriggerDialog />

        <InnerToolbar>
          <RaisedButton
            data-e2e="trigger-add-button"
            label="Add"
            primary={true}
            style={{ marginRight: 0 }}
            onTouchTap={Actions.showDialog}
          />
        </InnerToolbar>

        <Container>
          <TriggersList
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs}
          />
        </Container>
      </div>
    );
  }
});
