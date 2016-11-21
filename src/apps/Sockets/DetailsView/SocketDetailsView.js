import React from 'react';
import { withRouter } from 'react-router';
import Reflux from 'reflux';
import _ from 'lodash';

import Store from '../SocketsStore';
import Actions from '../SocketsActions';

import { Loading, RegistryEmptyView } from '../../../common';
import InfoBar from './SocketDetailInfoBar';
import ContentSection from './SocketDetailContentSection';
import SocketInstallDialog from '../SocketsDialog';

const SocketsDetailsView = React.createClass({
  mixins: [Reflux.connect(Store)],

  getInitialState() {
    return {
      currentLanguage: 'curl'
    };
  },

  componentDidMount() {
    const { socketId } = this.props.params;

    Actions.fetchSocketsInfo(socketId);
  },

  getStyles() {
    return {
      container: {
        display: 'flex'
      }
    };
  },

  getAuthorInfo() {
    const { currentSocket } = this.state;

    if (currentSocket) {
      const githubSplitLink = currentSocket.ymlUrl.split('/');
      const socketLink = `https://github.com/${githubSplitLink[3]}/${githubSplitLink[4]}`;
      const authorLink = `https://github.com/${githubSplitLink[3]}`;
      const githubSubLink = `/${githubSplitLink[3]}/${githubSplitLink[4]}`;
      const authorObj = {
        subLink: githubSubLink,
        name: currentSocket.author.name,
        email: currentSocket.author.email,
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
    const { currentSocket, currentLanguage, isLoading } = this.state;
    const styles = this.getStyles();
    const endpoints = this.getEndpointsObjects();
    const SocketImageDir = '/img/custom-socket-assemble.svg';

    if (!currentSocket) {
      return (
        <Loading show={isLoading}>
          <RegistryEmptyView
            title="This Socket is unavailable"
            description={`It looks like the Socket is not valid. Please use another Socket, or if this is your own
              Socket, try checking if YAML file is correct.`}
            src={SocketImageDir}
            altText="No  Socket"
          />
        </Loading>
      );
    }

    return (
      <Loading show={isLoading}>
        <SocketInstallDialog
          shouldRedirect={true}
          url={currentSocket && currentSocket.ymlUrl}
        />
        <div style={styles.container}>
          <InfoBar
            endpoints={endpoints}
            currentSocket={currentSocket}
          />
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

export default withRouter(SocketsDetailsView);
