import {
  FETCHED_LOGIN, LOGIN_ERROR, LOGIN_GOT_RESPONSE, LOGIN_REQUEST,
} from '../types';

/**
 * Ставит флаг loading
 * @returns {{type: string}}
 */
export const loginRequest = () => ({ type: LOGIN_REQUEST });

/**
 * Записывает пользователя в store и ставит флаг в loading: false
 * @param user
 * @returns {{payload: *, type: string}}
 */
export const loginGotResponse = (user) => ({
  type: LOGIN_GOT_RESPONSE,
  payload: user.name,
});

/**
 * Записывает в store ошибку и ставит флаг loading: false
 * @param err
 * @returns {{type: string, error: *}}
 */
export const loginError = (err) => ({
  type: LOGIN_ERROR,
  error: err,
});

export const loginFetch = (user) => ({ type: FETCHED_LOGIN, user });
