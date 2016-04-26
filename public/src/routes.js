import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './pages/App';
import Index from './pages/Index';
import UserShow from './pages/UserShow';
import GroupShow from './pages/GroupShow';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="users/:id" component={UserShow} />
    <Route path="groups/:id" component={GroupShow} />
    <Redirect from="*" to="/" />
  </Route>
);
