import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import basicReducer from './basicReducer';

export default combineReducers({
  routing: routerReducer,
  basic: basicReducer,
});
