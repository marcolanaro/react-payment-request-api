import { Action } from 'redux-actions';

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

export default reducers;
