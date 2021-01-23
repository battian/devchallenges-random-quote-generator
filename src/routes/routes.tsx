import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Author from '../pages/Author';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/authors/:authorName" component={Author} />
  </Switch>
);

export default Routes;
