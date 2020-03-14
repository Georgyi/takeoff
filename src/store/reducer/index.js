import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './auth';
import contactsReducer from '../../components/contacts/reducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  contacts: contactsReducer,
});
