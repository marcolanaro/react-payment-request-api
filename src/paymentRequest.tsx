import * as React from 'react';

import { AnyComponent } from './utils';
import normalizeInstrumentations from './normalizeInstrumentations';
import {
  PaymentRequestParamsConfig,
  PaymentRequestParams,
  Callback,
  Resolve,
  Reject,
} from './types';

let request: PaymentRequest;

const isSupported = !!(window as any).PaymentRequest; // tslint:disable-line:no-any

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
      new Promise((resolve: Resolve, reject: Reject) =>
        params.onShowSuccess(paymentResponse, resolve, reject))
          .then(() => paymentResponse.complete('success'))
          .catch(() => paymentResponse.complete('fail'));
    })
    .catch((err) => params.onShowFail(err));
};

const paymentRequest = <TProps extends Object>(params?: PaymentRequestParamsConfig) => (
  WrappedComponent: AnyComponent<TProps, any> // tslint:disable-line:no-any
): React.ComponentClass<TProps> => (
  class ExtendedComponent extends React.Component<TProps, void> {
    static contextTypes =  {
      store: React.PropTypes.object,
    };

    context: {
      store: {
        dispatch: (payload: any) => any; // tslint:disable-line:no-any
        getState: () => any; // tslint:disable-line:no-any
      }
    };

    getEnhancedComponent(paymentRequestParams: PaymentRequestParams) {
      return (
        <WrappedComponent
          {...this.props as any} // tslint:disable-line:no-any
          isSupported={true}
          show={show(paymentRequestParams)}
          abort={abort}
        />
      );
    }

    render() {
      const { props } = this;
      if (!isSupported || !params) {
        return <WrappedComponent {...props as any} />; // tslint:disable-line:no-any
      }
      if (typeof params === 'function') {
        if (this.context.store) {
          return this.getEnhancedComponent(params(
            this.context.store.dispatch,
            this.context.store.getState
          ));
        } else {
          console.warn(' %cRedux store not found', 'color: tomato;');
          return <WrappedComponent {...props as any} />; // tslint:disable-line:no-any
        }
      }
      return this.getEnhancedComponent(params);
    }
  }
);

export default paymentRequest;
