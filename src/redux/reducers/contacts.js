import {
  CONTACTS_REQUESTED,
  CONTACTS_SUCCESS,
  CONTACTS_FAILURE,
  ADD_CONTACT_SUCCESS,
  SEARCH_CONTACT,
} from '../types';

const initialState = {
  contacts: [],
  loading: false,
  search: [],
  errorContacts: '',
};

export const contacts = (state = initialState, action) => {
  switch (action.type) {
    case CONTACTS_REQUESTED: {
      return {
        ...state,
        loading: true,
        errorContacts: '',
      };
    }
    case CONTACTS_SUCCESS:{
      return {
        ...state,
        loading: false,
        contacts: action.payload,
      }
    }
    case CONTACTS_FAILURE:{
      return {
        ...state,
        loading: false,
        errorContacts: action.payload,
      }
    }
    case ADD_CONTACT_SUCCESS:{
      return {
        ...state,
        contacts:[...state.contacts, action.payload],
        loading: false,
      }
    }
    case SEARCH_CONTACT: {
      return {
        ...state,
        search: action.payload
      }
    }
    default:
      return state;
  }
};
