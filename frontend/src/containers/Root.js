import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from "../redux/configureStore";
import routes from "../routes";

export const store = configureStore({});

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export default class Root extends Component {

  render() {
    return (
      <Provider store={store}>
        <span>
          <Router history={history}>
            {routes}
          </Router>
          </span>
      </Provider>
    );
  }
}
