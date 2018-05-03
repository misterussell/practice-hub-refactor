import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Gamezone, RouteNotFound } from './containers';
import { BasicD3Grid } from './components';

import Store from './Store';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/gameOfLife" render={() => <Gamezone store={Store}/>} />
    <Route path="/d3" render={() => <BasicD3Grid store={Store}/>} />
    <Route component={RouteNotFound} />
  </Switch>
);

export default Routes;
