import * as types from './types';
import config from '../../config';

export const getLSContacts = () => localStorage.getItem(config.LSContacts) ? JSON.parse(localStorage.getItem(config.LSContacts)) : [];
const updateLSContacts = (contacts) => localStorage.setItem(config.LSContacts, JSON.stringify(contacts));

export const addContact = (contact) => (dispatch) => {
  const contacts = [...getLSContacts(), contact];

  updateLSContacts(contacts);

  dispatch({ type: types.addContact, payload: { contacts } });
};

export const updateContact = (updatedContact) => (dispatch) => {
  const contacts = [...getLSContacts()].map((contact) =>
    contact.id === updatedContact.id ? updatedContact : contact);

  updateLSContacts(contacts);

  dispatch({ type: types.updateContact, payload: { contacts } });
};

export const removeContact = (id) => (dispatch) => {
  const contacts = [...getLSContacts()].filter((contact) => contact.id !== id);

  updateLSContacts(contacts);

  dispatch({ type: types.removeContact, payload: { contacts } });
};

export const searchContacts = (value) => (dispatch) => {
  const contacts = [...getLSContacts()];

  if (value) {
    localStorage.setItem('search', value);

    const filteredContacts = contacts.filter((contact) => {
      const contactKeys = Object.keys(contact).filter((key) => key !== 'id');
      return contactKeys.some((contactKey) => contact[contactKey].indexOf(value) > -1);
    });

    dispatch({ type: types.searchContacts, payload: { contacts: filteredContacts } });
  } else {
    localStorage.removeItem('search');
    dispatch({ type: types.searchContacts, payload: { contacts } });
  }
};
