import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, GameBoard, RouteNotFound } from './containers';

import Store from './Store';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/gameOfLife" component={GameBoard} />
    <Route component={RouteNotFound} />
  </Switch>
);

export default Routes;
