import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import ChannelHistoryStore from './ChannelHistoryStore';
import ChannelHistoryActions from './ChannelHistoryActions';

import { Container, InnerToolbar } from '../../common/';

import ChannelHistoryList from './ChannelHistoryList';

const ChannelHistory = React.createClass({
  mixins: [Reflux.connect(ChannelHistoryStore)],

  getDefaultProps() {
    return {
      showHeader: false
    };
  },

  componentDidMount() {
    ChannelHistoryActions.getChannelHistory(this.props.channelName);
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

    router.push(`/instances/${params.instanceName}/channels`);
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
});

export default withRouter(ChannelHistory);
