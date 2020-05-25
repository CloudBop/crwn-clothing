import UserActionTypes from './user.types';
const INITIAL_STATE = {
  currentUser: null,
  error: null
};
const userReducer = (state = INITIAL_STATE, action) => {
  console.log('action', action);
  switch (action.type) {
    case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
    case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
      console.log('reducer updated state', action);
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
    case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
      return {
        ...state,
        // currentUser: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
