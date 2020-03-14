import * as types from './types';

const initialState = {
  isAuth: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.checkSession:
      return {
        ...state,
        ...payload,
      };
    case types.logout:
      return {
        ...state,
        ...payload,
      };
    case types.login:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
