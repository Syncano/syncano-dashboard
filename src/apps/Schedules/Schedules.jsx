import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import { DialogsMixin } from '../../mixins';

import Actions from './SchedulesActions';
import Store from './SchedulesStore';
import ScriptsActions from '../Scripts/ScriptsActions';

import SchedulesList from './SchedulesList';
import ScheduleDialog from './ScheduleDialog';
import { RaisedButton } from 'material-ui';
import { Container } from '../../common/';
import SocketsInnerToolbar from '../Sockets/SocketsInnerToolbar';

export default React.createClass({
  displayName: 'ScheduleSockets',

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
        <Helmet title="Schedules" />
        <ScheduleDialog />

        <SocketsInnerToolbar>
          <RaisedButton
            data-e2e="schedule-add-button"
            label="Add"
            primary={true}
            style={{ marginRight: 0 }}
            onTouchTap={Actions.showDialog}
          />
        </SocketsInnerToolbar>

        <Container>
          <SchedulesList
            name="Schedules"
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs}
          />
        </Container>
      </div>
    );
  }
});
