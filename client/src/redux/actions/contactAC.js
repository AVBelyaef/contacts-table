import {
  CONTACTS_REQUESTED,
  CONTACTS_FAILURE,
  CONTACTS_SUCCESS,
  FETCHED_CONTACTS,
  FETCHED_ADD_CONTACT,
  FETCHED_REMOVE_CONTACT,
  FETCHED_UPDATE_CONTACT,
  SEARCH_CONTACT,
} from '../types';

/**
 * Ставит флаг loading
 * @returns {{type: string}}
 */
export const contactsRequested = () => ({ type: CONTACTS_REQUESTED });

/**
 * Записывает контакты в store и ставит флаг loading: false
 * @param contacts массив контактов
 * @returns {{payload: *, type: string}}
 */
export const contactsSuccess = (contacts) => ({
  type: CONTACTS_SUCCESS,
  payload: contacts,
});

/**
 * Записывает в store ошибку и ставит флаг loading: false
 * @param err
 * @returns {{type: string, error: *}}
 */
export const contactsFailure = (err) => ({
  type: CONTACTS_FAILURE,
  error: err,
});

/**
 * Запускает сагу contactsFetchAsync
 * @returns {{type: string}}
 */
export const fetchContacts = () => ({ type: FETCHED_CONTACTS });

/**
 * Вызывает сагу contactAddFetchAsync
 * @param contact
 * @returns {{payload: *, type: string}}
 */
export const fetchAddContact = (contact) => ({
  type: FETCHED_ADD_CONTACT,
  payload: contact,
});

/**
 * Вызывает сагу contactRemoveFetchAsync
 * @param id
 * @returns {{payload: *, type: string}}
 */
export const fetchRemoveContact = (id) => ({
  type: FETCHED_REMOVE_CONTACT,
  payload: id,
});

/**
 * Записывает в store искомый контакт
 * @param search
 * @returns {{payload: *, type: string}}
 */
export const searchContact = (search) => ({
  type: SEARCH_CONTACT,
  payload: search,
});

/**
 * Вызывает сагу contactUpdateFetchAsync
 * @param contact
 * @returns {{payload: *, type: string}}
 */
export const fetchUpdateContact = (contact) => ({
  type: FETCHED_UPDATE_CONTACT,
  payload: contact,
});
