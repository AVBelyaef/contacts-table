import { put, call, takeEvery } from 'redux-saga/effects';

import {
  FETCHED_LOGIN,
  LOGIN_ERROR,
  LOGIN_GOT_RESPONSE,
  LOGIN_REQUEST,
  CONTACTS_REQUESTED,
  CONTACTS_FAILURE,
  CONTACTS_SUCCESS,
  FETCHED_CONTACTS,
  ADD_CONTACT_SUCCESS,
  FETCHED_ADD_CONTACT,
  FETCHED_REMOVE_CONTACT,
  FETCHED_UPDATE_CONTACT,
  SEARCH_CONTACT,
} from '../types';

/////////////////////////////
//         USERS           //
/////////////////////////////

export const loginRequest = () => ({ type: LOGIN_REQUEST });

export const loginGotResponse = (user) => ({
  type: LOGIN_GOT_RESPONSE,
  payload: user.name,
});

export const loginError = (err) => ({
  type: LOGIN_ERROR,
  loginStatusError: err,
});

export function* loginFetchAsync(action) {
  try {
    yield put(loginRequest());
    const response = yield call(() => {
      const { email, password } = action.user;
      return fetch(
        `http://localhost:3004/users?email=${email}&password=${password}`
      );
    });

    if (response.status === 200) {
      const result = yield call(() => response.json());
      yield put(loginGotResponse(result[0]));
    } else if (response.status === 400) {
      const err = yield call(() => response.json());
      yield put(loginError(err));
    }
  } catch (error) {
    console.log(error);
    yield put(loginError(error.message));
  }
}

export const loginFetch = (user) => ({ type: FETCHED_LOGIN, user });

/////////////////////////////
//         CONTACTS        //
/////////////////////////////

export const contactsRequested = () => ({ type: CONTACTS_REQUESTED });

export const contactsSuccess = (contacts) => {
  return {
    type: CONTACTS_SUCCESS,
    payload: contacts,
  };
};

export const contactsFailure = (err) => {
  return {
    type: CONTACTS_FAILURE,
    payload: err,
  };
};

export function* contactsFetchAsync() {
  try {
    yield put(contactsRequested());
    const data = yield call(() => fetch('http://localhost:3004/contacts'));
    const json = yield call(() => data.json());
    if (data.status === 200) {
      yield put(contactsSuccess(json));
    } else {
      yield put(contactsFailure(data.statusText));
    }
  } catch (error) {
    console.log(error);
    yield put(contactsFailure(error.message));
  }
}

export const fetchContacts = () => ({ type: FETCHED_CONTACTS });

/////////////////////////////
//        ADD_CONTACTS     //
/////////////////////////////

export const addContactSuccess = (contact) => {
  return {
    type: ADD_CONTACT_SUCCESS,
    payload: contact,
  };
};

export function* contactAddFetchAsync(action) {
  try {
    yield put(contactsRequested());
    const data = yield call(() =>
      fetch('http://localhost:3004/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: action.payload.name,
          phone: action.payload.phone,
          email: action.payload.email,
        }),
      })
    );
    if (data.status === 201) {
      // yield put(addContactSuccess(action.payload));
      yield put(fetchContacts());
    } else {
      yield put(contactsFailure(data.statusText));
    }
  } catch (error) {
    console.log('error', error);
    yield put(contactsFailure(error.message));
  }
}

export const fetchAddContact = (contact) => {
  return {
    type: FETCHED_ADD_CONTACT,
    payload: contact,
  };
};

export function* contactRemoveFetchAsync(action) {
  try {
    const id = action.payload;
    yield put(contactsRequested());
    const result = yield call(() =>
      fetch(`http://localhost:3004/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );

    if (result.status === 200) {
      yield put(fetchContacts());
    } else {
      yield put(contactsFailure(result.statusText));
    }
  } catch (error) {
    console.log(error);
    yield put(contactsFailure(error.message));
  }
}

export const fetchRemoveContact = (id) => {
  return {
    type: FETCHED_REMOVE_CONTACT,
    payload: id,
  };
};

export const searchContact = (search) => {
  return {
    type: SEARCH_CONTACT,
    payload: search,
  };
};

export const fetchUpdateContact = (contact) => {
  return {
    type: FETCHED_UPDATE_CONTACT,
    payload: contact,
  };
};

export function* contactUpdateFetchAsync(action) {
  try {
    yield put(contactsRequested());
    const { id, name, phone, email } = action.payload;
    const result = yield call(() =>
      fetch(`http://localhost:3004/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email }),
      })
    );
    if (result.status === 200) {
      yield put(fetchContacts());
    } else {
      yield put(contactsFailure(result.statusText));
    }
  } catch (error) {
    console.log(error);
    yield put(contactsFailure(error.message));
  }
}

export function* watchFetches() {
  yield takeEvery(FETCHED_LOGIN, loginFetchAsync);
  yield takeEvery(FETCHED_CONTACTS, contactsFetchAsync);
  yield takeEvery(FETCHED_ADD_CONTACT, contactAddFetchAsync);
  yield takeEvery(FETCHED_REMOVE_CONTACT, contactRemoveFetchAsync);
  yield takeEvery(FETCHED_UPDATE_CONTACT, contactUpdateFetchAsync);
}
