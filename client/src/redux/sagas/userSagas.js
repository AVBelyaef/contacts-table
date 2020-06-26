import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCHED_LOGIN } from '../types';
import { loginError, loginGotResponse, loginRequest } from '../actions/usersAC';

/**
 * Обновляет контакт в базе данных
 * @param {object} action React action
 */
export function* loginFetchAsync(action) {
  yield put(loginRequest());
  try {
    const response = yield call(() => {
      const { email, password } = action.user;
      return fetch(
        `http://localhost:3004/users?email=${email}&password=${password}`,
      );
    });
    const result = yield call(() => response.json());
    if (response.status === 200) {
      yield put(loginGotResponse(result[0]));
    } else if (response.status === 400) {
      yield put(loginError(result));
    }
  } catch (error) {
    yield put(loginError(error.message));
  }
}
const usersSagas = [
  takeEvery(FETCHED_LOGIN, loginFetchAsync),
];

export default usersSagas;
