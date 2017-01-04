import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router';

import SocketsRegistryStore from '../SocketsRegistryStore';
import SocketsRegistryActions from '../SocketsRegistryActions';

import { Loading, RegistryEmptyView, InnerToolbar } from '../../../common';
import InfoBar from './SocketDetailInfoBar';
import ContentSection from './SocketDetailContentSection';

const SocketsRegistryDetailsView = React.createClass({
  mixins: [Reflux.connect(SocketsRegistryStore)],

  getInitialState() {
    return {
      currentLanguage: 'curl'
    };
  },

  componentDidMount() {
    const { socketId } = this.props.params;

    SocketsRegistryActions.fetchSocketsInfo(socketId);
  },

  getStyles() {
    return {
      container: {
        display: 'flex'
      }
    };
  },

  getAuthorInfo() {
    const { socketId } = this.props.params;
    const { currentSocket } = this.state;
    const currentSocketObject = SocketsRegistryStore.getSocketById(socketId);

    if (currentSocketObject) {
      const githubSplitedLink = currentSocketObject.url.split('/');
      const socketLink = `https://github.com/${githubSplitedLink[3]}/${githubSplitedLink[4]}`;
      const authorLink = `https://github.com/${githubSplitedLink[3]}`;
      const githubSubLink = `/${githubSplitedLink[3]}/${githubSplitedLink[4]}`;
      const authorObj = {
        subLink: githubSubLink,
        name: currentSocketObject.author,
        email: currentSocketObject.email,
        license: currentSocket ? currentSocket.license : 'N/A',
        authorLink,
        socketLink
      };

      return authorObj;
    }

    return {};
  },

  getRuntimeNames() {
    const { currentSocket } = this.state;

    if (currentSocket) {
      const { scripts } = currentSocket.dependencies;
      const runtimesNamesLang = {
        golang: 'Goolang',
        swift: 'Swift',
        ruby: 'Ruby',
        'python_library_v5.0': 'Python',
        'python_library_v4.2': 'Python',
        python3: 'Python',
        php: 'PHP',
        'nodejs_library_v1.0': 'NodeJS',
        'nodejs_library_v0.4': 'NodeJS'
      };
      const runtimes = _.map(scripts, (scriptInfo) => runtimesNamesLang[scriptInfo.runtime_name]);

      return runtimes;
    }

    return [];
  },

  getEndpointsObjects() {
    const { currentSocket } = this.state;

    if (!currentSocket) {
      return {};
    }

    const endpointsLists = _.reduce(currentSocket.endpoints, (allEndpoints, currentEndpoint, endpointName) => {
      const allMethodsNames = ['get', 'post', 'put', 'patch', 'delete'];
      const availableMethods = _.keys(currentEndpoint);

      const isAllMethodsAllowed = _.includes(availableMethods, 'script');

      if (availableMethods.length && !isAllMethodsAllowed) {
        const endpointMethodsList = _.map(availableMethods, (method) => (
          {
            type: method,
            info: currentEndpoint[method]
          }
        ));

        allEndpoints[endpointName] = endpointMethodsList;

        return allEndpoints;
      }

      const allEndpointMethodsList = _.map(allMethodsNames, (method) => (
        {
          type: method,
          info: {}
        }
      ));

      allEndpoints[endpointName] = allEndpointMethodsList;

      return allEndpoints;
    }, {});

    return endpointsLists;
  },

  setCurrentLanguage(languageName) {
    this.setState({ currentLanguage: languageName });
  },

  render() {
    const { isLoading, router } = this.props;
    const { currentSocket, currentLanguage } = this.state;
    const styles = this.getStyles();
    const endpoints = this.getEndpointsObjects();
    const title = currentSocket && `Sockets Registry: ${currentSocket.name}`;
    const handleBackClick = () => {
      router.push('/sockets-registry');
    };

    if (!currentSocket) {
      return (
        <RegistryEmptyView
          title="This Socket is unavailable"
          description={`It looks like the Socket is not valid. Please use another Socket, or if this is your own Socket,
            try checking if YAML file is correct.`}
          src={'/img/socket-assemble.svg'}
          altText="No  Socket"
        />
      );
    }

    return (
      <Loading show={isLoading}>
        <Helmet title={title} />
        <InnerToolbar
          title={title}
          backButton={true}
          backFallback={handleBackClick}
          backButtonTooltip="Go back to Sockets Registry"
        />
        <div style={styles.container}>
          <InfoBar endpoints={endpoints} />
          <ContentSection
            handleChangeLanguage={this.setCurrentLanguage}
            currentLanguage={currentLanguage}
            runtimes={this.getRuntimeNames()}
            author={this.getAuthorInfo()}
            endpoints={endpoints}
            dependencies={currentSocket && currentSocket.dependencies}
            socketName={currentSocket && currentSocket.name}
            socketDescription={currentSocket && currentSocket.description}
          />
        </div>
      </Loading>
    );
  }
});

export default withRouter(SocketsRegistryDetailsView);
