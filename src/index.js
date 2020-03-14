import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from './components/app';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';
import { checkSession } from './store/reducer/auth/actions';

import './index.scss';

const store = configureStore();

store.dispatch(checkSession());

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
