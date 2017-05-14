/* tslint:disable:no-any */
import * as React from 'react';
import { Component } from 'react';

import {
  PaymentRequestEnancher,
  PaymentRequestParams,
  PaymentRequestInterface,
  Callback,
  Resolve,
  Reject,
} from './types';

declare var PaymentRequest: any;

let request: any;

const isSupported = !!(window as any).PaymentRequest;

const abort = () => request.abort();

const addEventListener = (requestListener: any, event: string, callback: Callback) => {
  if (!!callback) {
    requestListener.addEventListener(event, (e: any) =>
      e.updateWith(new Promise((resolve: Resolve, reject: Reject) =>
        callback(requestListener, resolve, reject)))
    );
  }
};

const show = (params: PaymentRequestParams) => () => {
  request = new PaymentRequest(params.methodData, params.details, params.options);

  addEventListener(request, 'shippingaddresschange', params.onShippingAddressChange);
  addEventListener(request, 'shippingoptionchange', params.onShippingOptionChange);

  return request.show()
    .then((paymentResponse: any) => {
      new Promise((resolve: Resolve, reject: Reject) =>
        params.onShowSuccess(paymentResponse, resolve, reject))
          .then(() => paymentResponse.complete('success'))
          .catch(() => paymentResponse.complete('fail'));
    })
    .catch(params.onShowFail);
};

const factoryComponent = (
  WrappedComponent: React.StatelessComponent<any>,
  params: any
): React.StatelessComponent<PaymentRequestInterface & any> => (props: any) =>
  !isSupported || !params
    ? <WrappedComponent {...props} />
    : <WrappedComponent
        {...props}
        isSupported={true}
        show={show(params)}
        abort={abort}
    />;

const paymentRequest: PaymentRequestEnancher = (params: PaymentRequestParams) =>
  (WrappedComponent: React.StatelessComponent<any>) => {
    if (typeof params === 'function') {
      return class ExtendedComponent extends React.Component<any, any> {
        static contextTypes =  {
          store: React.PropTypes.object,
        };

        context: {
          store: {
            dispatch: (payload: any) => any;
            getState: () => any;
          }
        };

        render() {
          if (this.context.store) {
            return factoryComponent(
              WrappedComponent,
              params(
                this.context.store.dispatch,
                this.context.store.getState
              )
            )(this.props);
          }
          console.warn(' %cRedux store not found', 'color: tomato;');
          return React.createElement(WrappedComponent);
        }
      };
    }
    return factoryComponent(WrappedComponent, params);
  };

export default paymentRequest;
