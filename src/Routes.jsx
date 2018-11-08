import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Gamezone, D3Gameboard, RouteNotFound, CSVtoJSON } from './containers';

import Store from './Store';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/gameOfLife" render={() => <Gamezone store={Store}/> } />
    <Route path="/d3" render={() => <D3Gameboard store={Store}/> } />
    <Route path="/CSVtoJSON" render={() => <CSVtoJSON store={Store}/> } />
    <Route component={RouteNotFound} />
  </Switch>
);

export default Routes;
