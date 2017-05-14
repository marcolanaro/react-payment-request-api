import * as React from 'react';
import { PaymentRequestInterface } from 'react-payment-request-api';
import { connect } from 'react-redux';

export interface OwnProps {
  style: object;
}

export interface StateProps {
  backgroundColor: string;
}

const Button: React.StatelessComponent<PaymentRequestInterface & OwnProps & StateProps> = ({
  show, isSupported, style, backgroundColor,
}) => isSupported
  ? <button onClick={show} style={{ ...style, backgroundColor }}>Pay now!</button>
  : <span>Payment request not supported</span>;

export default connect<StateProps, void, OwnProps>((state) => ({
  backgroundColor: state.backgroundColor,
}))(Button);
