import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Action } from 'redux-actions';

import PaymentButton from './payment-button';

export interface State {
  supportedPaymentCards: string[];
}

const initialState = {
  supportedPaymentCards: ['visa'],
  backgroundColor: 'CornflowerBlue',
};

const reducers = (previousState: State = initialState, action: Action<any>) => { // tslint:disable-line:no-any
  switch (action.type) {
    case 'PROCESSING_PAYMENT':
      return ({ ...previousState, backgroundColor: action.payload.backgroundColor });
    default:
      return ({ ...previousState });
  }
};

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

const App = () =>
  <Provider store={store}>
    <PaymentButton
      style={{
        padding: '1rem',
        color: 'white',
        fontSize: '10vh',
      }}
    />
  </Provider>;

ReactDOM.render(<App />, document.getElementById('app'));
