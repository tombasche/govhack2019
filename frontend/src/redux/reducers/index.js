import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import dashboardReducer from './dashboard';

export default combineReducers({
  routing: routerReducer,
  dashboard: dashboardReducer,
});
