import * as React from 'react';

import { AnyComponent } from './utils';
import normalizeInstrumentations from './normalizeInstrumentations';
import {
  PaymentRequestParamsConfig,
  PaymentRequestInterface,
  PaymentRequestParams,
  Callback,
  Resolve,
  Reject,
} from './types';

let request: PaymentRequest;

const hasSupport = () => !!(window as any).PaymentRequest; // tslint:disable-line:no-any

const addEventListener = (requestListener: PaymentRequest, event: string, callback?: Callback) => {
  if (!!callback) {
    requestListener.addEventListener(
      event,
      (e: PaymentRequestUpdateEvent) => e.updateWith(
        new Promise((resolve: Resolve, reject: Reject) => callback(requestListener, resolve, reject))
      )
    );
  }
};

export const abort = () => request.abort();

export const show = (params: PaymentRequestParams) => () => {
  request = new PaymentRequest(
    normalizeInstrumentations(params.methodData),
    params.details,
    params.options || {}
  );

  addEventListener(request, 'shippingaddresschange', params.onShippingAddressChange);
  addEventListener(request, 'shippingoptionchange', params.onShippingOptionChange);

  request.show()
    .then((paymentResponse) => {
      return new Promise((resolve: Resolve, reject: Reject) =>
        params.onShowSuccess(paymentResponse, resolve, reject))
          .then(() => paymentResponse.complete('success'))
          .catch(() => paymentResponse.complete('fail'));
    })
    .catch((err) => params.onShowFail(err));
};

const paymentRequest = <TProps extends Object>() => (
  WrappedComponent: AnyComponent<TProps & PaymentRequestInterface, any> // tslint:disable-line:no-any
): React.ComponentClass<TProps & PaymentRequestParamsConfig> => (
  class ExtendedComponent extends React.Component<TProps & PaymentRequestParamsConfig, void> {
    render() {
      const { config, ...passedProps } = this.props as any; // tslint:disable-line:no-any
      const isSupported = hasSupport();
      const supportedProps = isSupported && config ?
        { isSupported, show: show(config), abort } :
        { isSupported };
      return <WrappedComponent {...passedProps} {...supportedProps} />;
    }
  }
);

export default paymentRequest;
