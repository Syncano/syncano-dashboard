# Syncano Dashboard
[![Slack](https://img.shields.io/badge/chat-on_slack-blue.svg)](https://www.syncano.io/slack-invite/)

[![CircleCI](https://circleci.com/gh/Syncano/syncano-dashboard/tree/master.svg?style=shield&circle-token=f0100f84a8aad047680750a7a97c064e0c384766)](https://circleci.com/gh/Syncano/syncano-dashboard/tree/master) [![PRs](https://img.shields.io/badge/PRs-yes-orange.svg)](README.md#contribute) [![license](https://img.shields.io/github/license/syncano/syncano-dashboard.svg)](README.md#license)

![Dashboard Screenshot](https://www.syncano.io/a-serverless-app-platform-to-design-publish-and-manage-your-api-small@2x-456c4b747b33eb161b0585a324a5065a.jpg)

## Introduction

[Syncano Dashboard](http://dashboard.syncano.io/) is a [React](https://facebook.github.io/react/) based web application that lets you easily visualize your data held on [Syncano](https://www.syncano.io/) platform. Thanks to that, you have a complete overview of you applications, you can edit and test your scripts, manage users, collaborate with multiple admins, and [more](http://docs.syncano.io/docs/syncano-overview#section-the-dashboard) - all from one place.

## Code samples

Here is a sample code that will help you to get into our project.
This will show how we would create a dumb **CloseButton** component in react:

```javascript
import React from 'react';
import { IconButton } from 'material-ui';

const CloseButton = (props) => {
  const styles = {
    style: {
      position: 'absolute',
      top: 10,
      right: 10
    },
    iconStyle: {
      color: '#b8c0c9'
    }
  };

  return (
    <IconButton
      data-e2e={props['data-e2e']}
      style={{ ...styles.style, ...props.style }}
      iconStyle={{ ...styles.iconStyle, ...props.iconStyle }}
      onTouchTap={props.onTouchTap}
      iconClassName="synicon-close"
    />
  );
};

export default CloseButton;
```
and then use it in **PageIntro** so user can close it, like this:

```javascript
import React from 'react';
import { colors as Colors } from 'material-ui/styles';
import CloseButton from '../CloseButton/';

const PageIntro = ({ headline, text, actions, onRequestClose, show = 'true' }) => {
  const styles = {
    main: {
      marginBottom: 24,
      padding: 32,
      background: 'rgba(243, 243, 243, 0.901961)',
      textAlign: 'center',
      position: 'relative'
    },
    headline: {
      marginBottom: 24,
      fontSize: 28,
      color: Colors.grey900,
      lineHeight: 1
    },
    text: {
      margin: 0,
      maxWidth: 640,
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: 16,
      lineHeight: '1.5em'
    },
    actions: {
      marginTop: 32
    }
  };

  if (show === 'false') {
    return null;
  }

  return (
    <div style={styles.main}>
      {headline && <div style={styles.headline}>{headline}</div>}
      {text && <div style={styles.text}>{text}</div>}
      {actions && <div style={styles.actions}>{actions}</div>}
      {onRequestClose && <CloseButton onTouchTap={onRequestClose} />}
    </div>
  );
};

export default PageIntro;
```

## Requirements

### Dashboard

Dashboard is powered by [Node](https://nodejs.org).
You will need to install `7.0.0` version, as it is current that we are using. It should come with [npm](https://www.npmjs.com/) in `3.10.8` version.

> Without proper node version everything tends to blow up :fire: !

Recommended way to manage node versions is [n](https://github.com/tj/n).

If you already have other version of node, just install `n`:

```sh
$ sudo npm install -g n
$ n 7.0.0
```

And then type `n` to prompt selection of an installed node.
Use the up / down arrow to navigate, and press enter or the right arrow to select, or ^C to cancel:

```sh
$ n

  ο 7.0.0
    6.2.1
```

### E2E Tests

For E2E testing we use [nightwatchjs](http://nightwatchjs.org/) which is an automated UI testing framework powered by Node.
It uses [Selenium](https://github.com/SeleniumHQ/selenium) WebDriver API.

To start selenium you will also need:

* [Java](https://java.com/en/download/)
* [Java Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* [Chrome](https://www.google.com/chrome/)

All other necessary dependencies will be installed with dashboard and when starting tests for the first time.

## Installation

> You will need Node, if you already have it follow instructions, if not refer to [Requirements](README.md#requirements) section.

To install dependencies just do:

```sh
$ cd syncano-dashboard/
$ npm install
```

and start local development server (available at https://localhost:8080/):

```sh
$ npm start
```

## Configuration

Some parts of the dashboard (Billing and Social Logins) connect with external services like Stripe, Facebook etc. If you'd like to make them work locally, you'll have to create your own apps that utilize these services. Once you've done this, export appropriate keys, as shown below.

We also have some other commands or exports necessary for other parts of development. They are also listed in this section.

### Social login

Social login requires proper configuration of env variables with network ids e.g:

```sh
$ export FACEBOOK_ID='xx'
$ export GOOGLE_ID='xx'
$ export GITHUB_ID='xx'
```

Thus you will have to create:

* [Facebook](https://developers.facebook.com/docs/facebook-login)
* [Google](https://developers.google.com/identity/sign-in/web/sign-in)
* [GitHub](https://developer.github.com/v3/oauth/)

### Billing

For billing to work, you'll have to create a [Stripe](https://stripe.com/docs) account and then:

```sh
$ export STRIPE_PUBLISHABLE_KEY='xx'
$ export SYNCANO_BILLING_EMAIL='xx'
$ export SYNCANO_SUPPORT_EMAIL='xx'
```

### Icons

We are using set of [Material Design Icons](http://materialdesignicons.com/).
Icons are attached as font in static assets `src/assets` so if you want to rebuild whole font just use npm command:

```sh
$ npm run iconfont
```

and commit your changes.

## Tests

### Configuration

You will need to export `E2E_EMAIL` and `E2E_PASSWORD` for test account creation.

```sh
$ export E2E_EMAIL="xx"
$ export E2E_PASSWORD="xx"
```

It should be your **Syncano** account email address and password.

### Running tests

:warning: **Our current E2E test are in testing phase, and they run on your Syncano account.
Please be careful what you do.**

:information_source: **E2E tests require development server to be running, be sure to start it.**

E2E Test can be started by typing:

```sh
$ npm run e2e
```

If you want only one test suite to run use:

```sh
$ npm run e2e <tag>
```

Refer to the test files for the appropriate tag name.

> If part of the tests fail for some reason, please check your configuration. When it appeared after your changes be sure to fix tests, if that is not the case please fill in the issue.

## Contribute

Syncano Dashboard welcomes contributions in form of pull requests, as main purpose of open sourcing is to make dashboard better and easier to use.
We also want to give our community a way to be a part of our project and create features they want.

## Contact

If you have any questions, or just want to say hi, drop us a line at [support@syncano.com](mailto:support@syncano.com) or join us on [slack](https://www.syncano.io/slack-invite/).

## License

[MIT](LICENSE)
