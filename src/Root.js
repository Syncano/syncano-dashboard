import React from 'react';
import { Router, useRouterHistory } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import routes from './routes';
import useNamedRoutes from 'use-named-routes';

const history = useNamedRoutes(useRouterHistory(createHistory))({ routes });

const Root = () => (
  <Router history={history} routes={routes} />
);

export default Root;
