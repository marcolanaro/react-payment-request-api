import * as React from "react";
import { Component } from "react";

import {
    PaymentRequestEnancher,
    PaymentRequestParams,
    PaymentRequestInterface,
    Callback,
    Resolve,
    Reject,
} from "./types";

declare var PaymentRequest: any;

let request: any;

const isSupported = !!(window as any).PaymentRequest;

const abort = () => request.abort();

const addEventListener = (request: any, event: string, callback: Callback) => {
    if (!!callback) {
        request.addEventListener(event, (e: any) =>
            e.updateWith(new Promise((resolve: Resolve, reject: Reject) =>
                callback(request, resolve, reject)))
        );
    }
};

const show = (params: PaymentRequestParams) => () => {
    request = new PaymentRequest(params.methodData, params.details, params.options);

    addEventListener(request, "shippingaddresschange", params.onShippingAddressChange);
    addEventListener(request, "shippingoptionchange", params.onShippingOptionChange);

    return request.show()
        .then((paymentResponse: any) => {
            new Promise((resolve: Resolve, reject: Reject) =>
                params.onShowSuccess(paymentResponse, resolve, reject))
                    .then(() => paymentResponse.complete("success"))
                    .catch(() => paymentResponse.complete("fail"));
        })
        .catch(params.onShowFail);
};

const paymentRequest: PaymentRequestEnancher = (params: PaymentRequestParams) =>
    (WrappedComponent: React.StatelessComponent<any>): React.StatelessComponent<PaymentRequestInterface & any> =>
        (props) => !isSupported
            ? <WrappedComponent {...props} />
            : (
                <WrappedComponent
                    {...props}
                    isSupported
                    show={show(params)}
                    abort={abort}
                />
            );

export default paymentRequest;