const initialState = {
  currentUser: null
};
const userReducer = (state = initialState, action) => {
  //
  switch (action) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      };

    default:
      return state;
  }
  // should never invoked
  // return state;
};

export default userReducer;
