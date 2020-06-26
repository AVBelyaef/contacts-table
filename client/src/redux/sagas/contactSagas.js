import { call, put, takeEvery } from 'redux-saga/effects';
import {
  contactsFailure, contactsRequested, contactsSuccess, fetchContacts,
} from '../actions/contactAC';
import {
  FETCHED_ADD_CONTACT, FETCHED_CONTACTS, FETCHED_REMOVE_CONTACT, FETCHED_UPDATE_CONTACT,
} from '../types';

/**
 * Добавляет все контакты в Store
 */
export function* contactsFetchAsync() {
  yield put(contactsRequested());
  try {
    const data = yield call(() => fetch('http://localhost:3004/contacts'));
    const json = yield call(() => data.json());
    if (data.status === 200) {
      yield put(contactsSuccess(json));
    } else {
      yield put(contactsFailure(data.statusText));
    }
  } catch (error) {
    yield put(contactsFailure(error.message));
  }
}

/**
 * Добавляет контакт в базу данных
 * @param {object} action React action
 */
export function* contactAddFetchAsync(action) {
  const { name, phone, email } = action.payload;
  yield put(contactsRequested());
  try {
    const data = yield call(() => fetch('http://localhost:3004/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        email,
      }),
    }));
    if (data.status === 201) {
      yield put(fetchContacts());
    } else {
      yield put(contactsFailure(data.statusText));
    }
  } catch (error) {
    yield put(contactsFailure(error.message));
  }
}

/**
 * Удаляет контакт из базы данных
 * @param {object} action React action
 */
export function* contactRemoveFetchAsync(action) {
  try {
    const id = action.payload;
    yield put(contactsRequested());
    const result = yield call(() => fetch(`http://localhost:3004/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }));

    if (result.status === 200) {
      yield put(fetchContacts());
    } else {
      yield put(contactsFailure(result.statusText));
    }
  } catch (error) {
    yield put(contactsFailure(error.message));
  }
}

/**
 * Обновляет контакт в базе данных
 * @param {object} action React action
 */
export function* contactUpdateFetchAsync(action) {
  try {
    yield put(contactsRequested());
    const {
      id, name, phone, email,
    } = action.payload;
    const result = yield call(() => fetch(`http://localhost:3004/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, email }),
    }));
    if (result.status === 200) {
      yield put(fetchContacts());
    } else {
      yield put(contactsFailure(result.statusText));
    }
  } catch (error) {
    yield put(contactsFailure(error.message));
  }
}

const contactSagas = [
  takeEvery(FETCHED_CONTACTS, contactsFetchAsync),
  takeEvery(FETCHED_ADD_CONTACT, contactAddFetchAsync),
  takeEvery(FETCHED_REMOVE_CONTACT, contactRemoveFetchAsync),
  takeEvery(FETCHED_UPDATE_CONTACT, contactUpdateFetchAsync),
];

export default contactSagas;
