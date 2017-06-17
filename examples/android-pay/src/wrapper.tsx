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

interface OwnProps {
  style: React.CSSProperties;
}

const Wrapper: React.StatelessComponent<StateProps & DispatchProps & OwnProps> = ({
  style, supportedPaymentCards, onShowSuccess,
}) =>
  <Button
    config={getConfig(supportedPaymentCards, onShowSuccess)}
    style={style}
  />;

const mapState2Props = (state: State): StateProps => ({
  supportedPaymentCards: state.supportedPaymentCards,
});

const mapDispatch2Props = (dispatch: Dispatch<State>): DispatchProps => ({
  onShowSuccess: () => dispatch({ type: 'PROCESSING_PAYMENT' }),
});

export default connect<StateProps, DispatchProps, OwnProps>(mapState2Props, mapDispatch2Props)(Wrapper);
