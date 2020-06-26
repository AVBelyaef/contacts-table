import {
  LOGIN_ERROR,
  LOGIN_GOT_RESPONSE,
  LOGIN_REQUEST,
} from '../types';

const initialState = {
  isLoggedIn: false,
  user: '',
  loginLoadingFetch: false,
  loginStatusError: '',
};

/**
 *
 * @param state
 * @param action react
 * @returns {{loginLoadingFetch: boolean, isLoggedIn: boolean,
 * loginStatusError: string, user: string}}
 */
const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        loginLoadingFetch: true,
        loginStatusError: '',
      };
    case LOGIN_GOT_RESPONSE:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        loginLoadingFetch: false,
        loginStatusError: '',
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginLoadingFetch: false,
        loginStatusError: action.error,
      };
    default:
      return state;
  }
};
export default user;
