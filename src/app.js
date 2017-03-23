import 'normalize.css';
import './assets/fonts/avenir/avenir.css';
import './assets/fonts/icons/Syncano-Icons.css';
import './raven';
import './stripe';
import './segment';
import './app.sass';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './Root';
import tapPlugin from 'react-tap-event-plugin';


tapPlugin();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

try {
  render(Root);

  if (module.hot) {
    module.hot.accept('./Root', () => {
      const NextApp = require('./Root');

      render(NextApp);
    });
  }
} catch (err) {
  console.log('Render error', err);
}
