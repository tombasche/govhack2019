import * as actions from "../actions/actions";

const appInitialState = {
  data: null,
};

const basicReducer = (state = appInitialState, action) => {
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

export default basicReducer;
