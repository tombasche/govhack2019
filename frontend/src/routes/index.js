import React from "react";
import { Route, IndexRoute } from "react-router";

import SinglePage from '../layouts/SinglePage';

export default (
  <Route
    path="/"
    component={SinglePage}
  >
    <IndexRoute component={SomeComponent}/>
  </Route>
);
