import * as React from "react";
import { PaymentRequestParams } from './types';
declare const paymentRequest: (params: PaymentRequestParams) => (WrappedComponent: React.StatelessComponent<any>) => React.StatelessComponent<any>;
export default paymentRequest;
