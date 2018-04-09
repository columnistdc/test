export const START_FETCHING_USERS = "START_FETCHING_USERS";
export const COMPLETE_FETCHING_USERS = "COMPLETE_FETCHING_USERS";
export const ERROR_FETCHING_USERS = "ERROR_FETCHING_USERS";
export const SELECT_USER_BY_ID = "SELECT_USER_BY_ID";

export const loadUsers = () => {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_USERS
    });
    try {
      fetch("http://localhost:3000/features")
        .then(checkStatis)
        .then(async response => {
          const result = await response.json();
          dispatch(loadUsersSuccess(result));
        });
    } catch (error) {
      dispatch({ type: ERROR_FETCHING_USERS });
    }
  };
};
const checkStatis = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return new Error(`Bad response code: ${response.status}`);
  }
};

export const loadUsersSuccess = data => ({
  type: COMPLETE_FETCHING_USERS,
  data
});

export const selectUserById = id => ({
  type: SELECT_USER_BY_ID,
  id
});
