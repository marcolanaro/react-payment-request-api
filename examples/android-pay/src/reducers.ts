import { Action } from 'redux-actions';

export interface State {
  supportedPaymentCards: string[];
}

const initialState = {
  supportedPaymentCards: ['visa'],
  payed: false,
};

const reducers = (previousState: State = initialState, action: Action<any>) => { // tslint:disable-line:no-any
  switch (action.type) {
    case 'PROCESSING_PAYMENT':
      return ({ ...previousState, payed: true });
    default:
      return ({ ...previousState });
  }
};

export default reducers;
