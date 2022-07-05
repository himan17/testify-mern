import { createStore } from "redux";

// global variable
const initState = {
  user: null
}; 

const reducer = (state = initState, action) => {
  // check auth.js login section
  if (action.type === "login") {
    // handle JWT stuff and all
    // store their token and id to localStorage
    localStorage.setItem("JWT_PAYLOAD", action.token);
    localStorage.setItem("_ID", action.user._id);

    return {
      ...state,
      user: action.user
    };
  } else if (action.type === "set_user") {
    return {
      ...state,
      user: action.user
    };
  } else {
    return state;
  }
};

const store = createStore(reducer);

export default store;
