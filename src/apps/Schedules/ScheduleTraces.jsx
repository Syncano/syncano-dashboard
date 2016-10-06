import React from 'react';
import Reflux from 'reflux';

// Stores & Actions
import Store from '../Traces/TracesStore';
import Actions from '../Traces/TracesActions';

// Components
import Traces from '../Traces';

export default React.createClass({
  displayName: 'ScheduleTraces',

  mixins: [Reflux.connect(Store)],

  handleFetchTraces() {
    const { scheduleId } = this.props.params;

    return Actions.fetchScheduleTraces(scheduleId);
  },

  render() {
    const { scheduleId } = this.props.params;

    return (
      <Traces
        handleFetchTraces={this.handleFetchTraces}
        objectId={scheduleId}
        tracesFor="schedule"
      />
    );
  }
});
