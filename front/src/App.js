import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import Main from './containers/Main';
import { socketListeners } from './helpers';

export const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

const { dispatch } = store;
socketListeners(dispatch);

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
