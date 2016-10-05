import React from 'react';
import Reflux from 'reflux';

// Stores & Actions
import Store from '../Traces/TracesStore';
import Actions from '../Traces/TracesActions';

// Components
import Traces from '../Traces';

export default React.createClass({
  displayName: 'ScriptEndpointTraces',

  mixins: [Reflux.connect(Store)],

  handleFetchTraces() {
    const { scriptEndpointName } = this.props.params;

    return Actions.fetchScriptEndpointTraces(scriptEndpointName);
  },

  render() {
    const { scriptEndpointName } = this.props.params;

    return (
      <Traces
        handleFetchTraces={this.handleFetchTraces}
        objectId={scriptEndpointName}
        hasHeaderId={false}
        tracesFor="scriptEndpoint"
      />
    );
  }
});
