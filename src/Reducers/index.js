import {
  START_FETCHING_USERS,
  COMPLETE_FETCHING_USERS,
  ERROR_FETCHING_USERS,
  SELECT_USER_BY_ID
} from "../Actions";

const state = {
  isLoading: true,
  hasErrors: false,
  users: null,
  selected: null
};

export default (state = state, action) => {
  console.log("Action!", state);
  switch (action.type) {
    case START_FETCHING_USERS:
      return {
        ...state,
        isLoading: true,
        hasErrors: false
      };
    case COMPLETE_FETCHING_USERS:
      return {
        ...state,
        users: action.data,
        isLoading: false
      };
    case ERROR_FETCHING_USERS:
      return {
        ...state,
        isLoading: false,
        hasErrors: true
      };
    case SELECT_USER_BY_ID: {
      return {
        ...state,
        selected: action.id
      };
    }
    default:
      return state;
  }
};
