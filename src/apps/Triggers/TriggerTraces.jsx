import React from 'react';
import Reflux from 'reflux';

// Stores & Actions
import Store from '../Traces/TracesStore';
import Actions from '../Traces/TracesActions';

// Components
import Traces from '../Traces';

export default React.createClass({
  displayName: 'TriggerTraces',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [Reflux.connect(Store)],

  handleFetchTraces() {
    const { triggerId } = this.context.params;

    return Actions.fetchTriggerTraces(triggerId);
  },

  render() {
    const { triggerId } = this.context.params;

    return (
      <Traces
        handleFetchTraces={this.handleFetchTraces}
        objectId={triggerId}
        tracesFor="trigger"
      />
    );
  }
});
