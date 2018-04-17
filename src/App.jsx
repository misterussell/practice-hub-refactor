import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

import { Navigation } from './containers';

const App = () => (
  <BrowserRouter>
    <Navigation>
      <Routes />
    </Navigation>
  </BrowserRouter>
);

export default App;
