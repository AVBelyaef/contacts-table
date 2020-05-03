import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/reducers/rootReducer';


import createSagaMiddleware from 'redux-saga';
import { watchFetches } from './redux/actions';

import App from './components/App/App';
import ErrorBoundry from './components/ErrorBoundry/ErrorBoundry';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(watchFetches);

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
        <Router>
          <App />
        </Router>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);
