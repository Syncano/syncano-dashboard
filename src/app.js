import 'normalize.css';
import './assets/fonts/avenir/avenir.css';
import './assets/fonts/icons/Syncano-Icons.css';
import './raven';
import './stripe';
import './segment';
import './app.sass';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './Root';
import tapPlugin from 'react-tap-event-plugin';

const container = document.getElementById('app');

tapPlugin();

try {
  render(
    <AppContainer>
      <Root />
    </AppContainer>,
    container
  );
  if (module.hot) {
    module.hot.accept('./Root', () => {
      const NextApp = require('./Root'); // eslint-disable-line
      render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        container
      );
    });
  }
} catch (err) {
  console.log('Render error', err);
}
