import React from "react";
import { Route, IndexRoute } from "react-router";

import SinglePage from '../layouts/SinglePage';
import Dashboard from "../containers/Dashboard";

export default (
  <Route
    path="/"
    component={SinglePage}
  >
    <IndexRoute component={Dashboard}/>
  </Route>
);
