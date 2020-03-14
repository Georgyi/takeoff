import { message } from 'antd';
import { push } from 'connected-react-router';

import config from '../../../config';
import * as types from './types';

const durationMessage = 1.5;

export const checkSession = () => (dispatch) => {
  const token = localStorage.getItem(config.tokenName);

  const authMessage = token ? 'Вы авторизованы' : 'Пожалуйста авторизуйтесь';

  message.info(authMessage, durationMessage);

  dispatch({
    type: types.checkSession,
    payload: { isAuth: !!token },
  });
};

export const logout = () => (dispatch) => {
  message.info({ content: 'Вы вышли из системы', key: 'logout' }, durationMessage);

  localStorage.removeItem(config.tokenName);

  dispatch({ type: types.logout, payload: { isAuth: false } });
  dispatch(push(config.loginPath));
};

export const login = () => (dispatch) => {
  message.info({ content: 'Вы успешно зашли', key: 'login' }, durationMessage);

  localStorage.setItem(config.tokenName, config.tokenName);

  dispatch({ type: types.login, payload: { isAuth: true } });
};
