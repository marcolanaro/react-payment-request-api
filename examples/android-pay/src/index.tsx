import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import Wrapper from './wrapper';
import styles from './styles';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

const App = () =>
  <Provider store={store}>
    <div style={styles.container}>
      <div style={styles.logo} />
      <h1 style={styles.h1}>React Payment Request API</h1>
      <h2 style={styles.h2}>
        High order component to drive <a href="https://www.w3.org/TR/payment-request/" target="_blank" style={styles.a}>
          Payment Request
        </a> widget on react applications 💳
      </h2>
      <p>
        This component generate the configuration from a smart component connected to redux.
        <br />
        It will also dispatch a redux action on success.
      </p>
      <div style={styles.content}>
        <Wrapper style={styles.button} />
      </div>
    </div>
  </Provider>;

ReactDOM.render(<App />, document.getElementById('app'));
