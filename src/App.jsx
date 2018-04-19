import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure } from "mobx";

configure({ enforceActions: "strict" });

import Routes from './Routes';

import { Navigation } from './containers';

const App = () => (
  <Router>
    <Navigation />
  </Router>
);

export default App;
