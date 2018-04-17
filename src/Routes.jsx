import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Navigation } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

export default Routes;
