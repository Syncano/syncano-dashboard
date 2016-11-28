import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import Radium from 'radium';
import _ from 'lodash';

import Store from './TracesStore';
import Actions from './TracesActions';

import { IconButton } from 'material-ui';
import { Container, InnerToolbar } from '../../common/';

import TracesList from './TracesList';

const Traces = Radium(React.createClass({
  propTypes: {
    tracesFor: React.PropTypes.oneOf(['scriptEndpoint', 'script', 'trigger', 'schedule']),
    objectId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
  },

  mixins: [Reflux.connect(Store)],

  getDefaultProps() {
    return {
      tracesFor: 'script',
      hasHeaderId: true
    };
  },

  componentDidMount() {
    const { objectId, tracesFor } = this.props;

    Actions.setCurrentObjectId(objectId, tracesFor);
  },

  getConfig() {
    return {
      scriptEndpoint: {
        route: 'script-endpoints',
        backLabel: 'Go back to Script Endpoints list'
      },
      script: {
        route: 'scripts',
        backLabel: 'Go back to Scripts list'
      },
      trigger: {
        route: 'triggers',
        backLabel: 'Go back to Triggers list'
      },
      schedule: {
        route: 'schedules',
        backLabel: 'Go back to Schedules list'
      }
    }[this.props.tracesFor];
  },

  getTracesSource() {
    const { tracesFor } = this.props;

    if (tracesFor === 'scriptEndpoint') {
      return 'Script Endpoint';
    }

    return _.capitalize(tracesFor);
  },

  getToolbarTitleText() {
    const { currentObjectName } = this.state;
    const tracesFor = this.getTracesSource();

    if (currentObjectName) {
      return `${tracesFor}: ${currentObjectName}`;
    }

    return '';
  },

  handleBackClick() {
    const { router, params } = this.props;
    const config = this.getConfig();

    router.push(`/instances/${params.instanceName}/${config.route}/`);
  },

  render() {
    const { items, isLoading } = this.state;
    const { handleFetchTraces, hasHeaderId, objectId, tracesFor } = this.props;
    const config = this.getConfig();
    const toolbarTitleText = this.getToolbarTitleText();
    const headerId = hasHeaderId ? objectId : null;

    return (
      <div>
        <Helmet title={toolbarTitleText} />
        <InnerToolbar
          backFallback={this.handleBackClick}
          backButtonTooltip={config.backLabel}
          title={{
            title: toolbarTitleText,
            id: headerId
          }}
        >
          <IconButton
            iconClassName="synicon-refresh"
            tooltip="Reload Traces"
            onTouchTap={handleFetchTraces}
          />
        </InnerToolbar>
        <div style={{ position: 'relative', top: '35px' }}>
          <Container>
            <TracesList
              handleFetchTraces={handleFetchTraces}
              isLoading={isLoading}
              tracesFor={tracesFor}
              name="Traces"
              items={items}
            />
          </Container>
        </div>
      </div>
    );
  }
}));

export default withRouter(Traces);
