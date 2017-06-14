import * as React from 'react';
import paymentRequest, { PaymentRequestInterface } from 'react-payment-request-api';

export interface OwnProps {
  style: object;
}

const Button: React.StatelessComponent<PaymentRequestInterface & OwnProps> = ({
  show, isSupported, style,
}) => isSupported
  ? <button onClick={show} style={style}>Pay now!</button>
  : <span>Payment request not supported</span>;

export default paymentRequest<OwnProps>()(Button);
