import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';
import Isvg from 'react-inlinesvg';

import { DialogsMixin, FormMixin } from '../../mixins';

import Store from './DemoAppsStore';
import Actions from './DemoAppsActions';
import SessionStore from '../Session/SessionStore';

import { RaisedButton, FontIcon } from 'material-ui';
import { InnerToolbar, Dialog, Show, Notification } from '../../common';
import DemoAppBlogLink from './DemoAppBlogLink';

const DemoApp = React.createClass({
  mixins: [
    Reflux.connect(Store),
    DialogsMixin,
    FormMixin
  ],

  componentDidMount() {
    const { appName } = this.props.params;

    Actions.fetch();
    Actions.fetchDemoApp({ name: appName });
  },

  getStyles() {
    return {
      descContainer: {
        maxWidth: 750,
        margin: '0 auto',
        paddingTop: 30,
        fontSize: 18,
        lineHeight: 1.4
      },
      schemaContainer: {
        margin: '0 auto 40px',
        textAlign: 'center'
      },
      appDescContainer: {
        display: 'flex'
      },
      appTitle: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, .4)',
        paddingBottom: 20
      },
      appImage: {
        height: 140
      },
      shortInfo: {
        paddingLeft: 40
      },
      subHeader: {
        color: 'rgba(0, 0, 0, .4)',
        margin: '25px 0'
      },
      resourcesList: {
        listStyleType: 'none',
        padding: 0
      },
      listItem: {
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 1.4
      },
      icon: {
        fontSize: 36,
        height: 32,
        paddingRight: 10,
        display: 'inline-flex'
      },
      notification: {
        marginBottom: 20
      }
    };
  },

  handleBackClick() {
    const { router } = this.props;

    router.push('/demo-apps/');
  },

  handleCloseInstallDialog() {
    this.handleCancel('installDemoAppDialog');
  },

  handleConfirmInstallation() {
    const { appName } = this.props.params;
    const user = SessionStore.getUser();
    const email = user && user.email;
    const params = {
      email,
      instanceName: appName
    };

    Actions.installDemoApp(params);
  },

  handleShowInstallationDialog() {
    this.showDialog('installDemoAppDialog');
  },

  initDialogs() {
    const { isLoading, appTitle, errors } = this.state;

    return [{
      dialog: Dialog.FullPage,
      params: {
        key: 'installDemoAppDialog',
        ref: 'installDemoAppDialog',
        contentSize: 'small',
        title: `Install ${appTitle} Demo App`,
        onRequestClose: this.handleCloseInstallDialog,
        isLoading,
        actions: (
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={this.handleCloseInstallDialog}
            handleConfirm={this.handleConfirmInstallation}
            data-e2e-submit="demo-app-dialog-confirm-button"
          />
        ),
        children: (
          <div>
            <Show if={errors && errors.length}>
              <Notification type="error">
                {errors}
              </Notification>
            </Show>
            <div>
              This action will install {appTitle} Demo App. You will be redirected to new Instance.
            </div>
          </div>
        )
      }
    }];
  },

  renderToolbar() {
    const { appTitle } = this.state;

    return (
      <InnerToolbar
        title={`Demo App: ${appTitle}`}
        backButton={true}
        backFallback={this.handleBackClick}
        forceBackFallback={true}
        backButtonTooltip="Go back to Demo Apps list"
      >
        <RaisedButton
          label="Install Demo App"
          primary={true}
          onTouchTap={this.handleShowInstallationDialog}
          style={{ marginRight: 0 }}
          data-e2e="demo-app-install-button"
        />
      </InnerToolbar>
    );
  },

  renderDescContainer() {
    const styles = this.getStyles();
    const { appName, appTitle, appDesc, appGithubSrc, appTutorialSrc, feedback } = this.state;
    const appImageSrc = `/img/static/${appName}.png`;

    return (
      <div style={styles.descContainer}>
        {feedback && this.renderErrorNotification()}
        <div style={styles.appTitle}>
          {appTitle}
        </div>
        <div style={styles.appDescContainer}>
          <div style={styles.appImage}>
            <img
              src={appImageSrc}
              alt="demo app"
              style={styles.appImage}
            />
          </div>
          <div style={styles.shortInfo}>
            {appDesc}
          </div>
        </div>
        <div style={styles.subHeader}>
          Useful Resources
        </div>
        <div>
          <ul style={styles.resourcesList}>
            <li>
              <div style={styles.listItem}>
                <FontIcon
                  className={'synicon-github'}
                  style={styles.icon}
                />
                <div>
                  {'App Code: '}
                  <a
                    href={appGithubSrc}
                    target="_blank"
                  >
                    {appGithubSrc}
                  </a>
                </div>
              </div>
            </li>
            { appTutorialSrc && <DemoAppBlogLink linkSrc={appTutorialSrc} /> }
          </ul>
        </div>
        <div style={styles.subHeader}>
          Description
        </div>
        {`When you click the Install button, Syncano will set up the backend needed for
        the application to work. It'll also deploy the front-end and connect it to the database.
        Click on the Hosting socket url to view your app. Browse through Classes and Sockets to
        understand the data schema.`}
        <div style={styles.subHeader}>
          App Data Schema
        </div>
      </div>
    );
  },

  renderSchemaContainer() {
    const styles = this.getStyles();
    const { appName } = this.state;
    const appSchemaSrc = `/img/static/${appName}-schema.svg`;

    return (
      <div style={styles.schemaContainer}>
        <Isvg
          wrapper={React.DOM.div}
          src={appSchemaSrc}
          alt="demo app schema"
        />
      </div>
    );
  },

  renderErrorNotification() {
    const { feedback } = this.state;
    const styles = this.getStyles();

    return (
      <div style={styles.notification}>
        <Notification type="error">
          {feedback}
        </Notification>
      </div>
    );
  },

  render() {
    const { isLoading } = this.state;

    return (
      <Show if={!isLoading}>
        <div>
          {this.renderToolbar()}
          {this.getDialogs()}
          {this.renderDescContainer()}
        </div>
        {this.renderSchemaContainer()}
      </Show>
    );
  }
});

export default withRouter(DemoApp);
