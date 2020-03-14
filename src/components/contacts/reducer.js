import * as types from './types';
import { getLSContacts } from './actions';

const initialState = {
  contacts: [...getLSContacts()],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.addContact:
      return { ...state, ...payload };
    case types.updateContact:
      return { ...state, ...payload };
    case types.removeContact:
      return { ...state, ...payload };
    case types.searchContacts:
      return { ...state, ...payload };
    default:
      return state;
  }
}
