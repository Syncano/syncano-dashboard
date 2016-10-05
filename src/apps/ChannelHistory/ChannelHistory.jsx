import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import Radium from 'radium';
import Helmet from 'react-helmet';

// Stores and Actions
import Store from './ChannelHistoryStore';
import Actions from './ChannelHistoryActions';

// Components
import { Container, InnerToolbar } from '../../common/';

// Local components
import ChannelHistoryList from './ChannelHistoryList';

const ChannelHistory = Radium(React.createClass({
  propTypes: {
    channelName: React.PropTypes.string
  },

  mixins: [Reflux.connect(Store)],

  getDefaultProps() {
    return {
      showHeader: false
    };
  },

  componentDidMount() {
    Actions.getChannelHistory(this.props.channelName);
  },

  getStyles() {
    return {
      list: {
        position: 'relative',
        top: '35px'
      }
    };
  },

  handleBackClick() {
    const { router, params } = this.props;

    router.push(`/instances/${params.instanceName}/channels/`);
  },

  render() {
    const { channelName } = this.props;
    const { items, isLoading } = this.state;
    const styles = this.getStyles();
    const title = `Real-time Channel History for ${channelName}`;

    return (
      <div>
        <Helmet title={title} />
        <InnerToolbar
          title={title}
          backFallback={this.handleBackClick}
          backButtonTooltip="Go back to Channels list"
        />
        <div style={styles.list}>
          <Container>
            <ChannelHistoryList
              items={items}
              isLoading={isLoading}
            />
          </Container>
        </div>
      </div>
    );
  }
}));

export default withRouter(ChannelHistory);
