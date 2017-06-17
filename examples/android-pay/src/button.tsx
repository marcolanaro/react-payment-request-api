import * as React from 'react';
import paymentRequest, { PaymentRequestInterface } from 'react-payment-request-api';
import { connect } from 'react-redux';

import styles from './styles';

export interface OwnProps {
  style: React.CSSProperties;
}

export interface StateProps {
  payed: boolean;
}

const Button: React.StatelessComponent<PaymentRequestInterface & OwnProps & StateProps> = ({
  show, isSupported, style, payed,
}) => isSupported
  ? <button onClick={show} style={{ ...style, ...(payed ? styles.payed : styles.toPay) }} disabled={payed}>
      {payed ? 'Payed' : 'Pay now'}
    </button>
  : <span>Payment request not supported</span>;

const ConnectedButton = connect<StateProps, void, OwnProps>((state) => ({
  payed: state.payed,
}))(Button);

export default paymentRequest<OwnProps>()(ConnectedButton);
