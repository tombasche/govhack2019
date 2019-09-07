import * as actions from "../actions/dashboard";

const appInitialState = {
  data: null,
};

const dashboardReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case "RESET_STORE":
      return {
        ...appInitialState,
        data: state.data
      };
    case actions.FETCH_DATA:
      case actions.UPDATE_DATA:
      return {
          ...state,
        data : action.payload
      };
    default:
      return state;
  }
};

export default dashboardReducer;
