import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Button from './button';
import getConfig from './config';
import { State } from './reducers';

interface StateProps {
  supportedPaymentCards: string[];
}

interface DispatchProps {
  onShowSuccess: () => void;
}

const Wrapper: React.StatelessComponent<StateProps & DispatchProps> = ({ supportedPaymentCards, onShowSuccess }) =>
  <Button
    config={getConfig(supportedPaymentCards, onShowSuccess)}
    style={{
      padding: '1rem',
      color: 'white',
      fontSize: '10vh',
    }}
  />;

const mapState2Props = (state: State): StateProps => ({
  supportedPaymentCards: state.supportedPaymentCards,
});

const mapDispatch2Props = (dispatch: Dispatch<State>): DispatchProps => ({
  onShowSuccess: () => dispatch({ type: 'PROCESSING_PAYMENT', payload: { backgroundColor: 'AliceBlue' } }),
});

export default connect<StateProps, DispatchProps, {}>(mapState2Props, mapDispatch2Props)(Wrapper);
