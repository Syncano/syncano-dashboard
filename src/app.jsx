import 'normalize.css';
import './raven';
import './stripe';
import './segment';
import './app.sass';

import React from 'react';
import { render } from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

import routes from './routes';
import tapPlugin from 'react-tap-event-plugin';
import useNamedRoutes from 'use-named-routes';

tapPlugin();

const container = document.getElementById('app');
const history = useNamedRoutes(useRouterHistory(createHistory))({ routes });

render(<Router history={history} routes={routes} />, container);
