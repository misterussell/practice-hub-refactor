import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Gamezone, RouteNotFound } from './containers';

import Store from './Store';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/gameOfLife" render={() => <Gamezone store={Store}/>} />
    <Route component={RouteNotFound} />
  </Switch>
);

export default Routes;
