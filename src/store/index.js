import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducer';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer(history),
    preloadedState,
    composeWithDevTools(
      compose(
        applyMiddleware(
          thunk,
          routerMiddleware(history),
        ),
      ),
    ),
  );
}
