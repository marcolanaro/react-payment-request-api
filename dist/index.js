"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require("react");
let request;
const isSupported = !!window.PaymentRequest;
const abort = () => request.abort();
const addEventListener = (request, event, callback) => {
    if (!!callback) {
        request.addEventListener(event, (e) => e.updateWith(new Promise((resolve, reject) => callback(request, resolve, reject))));
    }
};
const show = (params) => () => {
    request = new PaymentRequest(params.methodData, params.details, params.options);
    addEventListener(request, "shippingaddresschange", params.onShippingAddressChange);
    addEventListener(request, "shippingoptionchange", params.onShippingOptionChange);
    return request.show()
        .then((paymentResponse) => {
        new Promise((resolve, reject) => params.onShowSuccess(paymentResponse, resolve, reject))
            .then(() => paymentResponse.complete("success"))
            .catch(() => paymentResponse.complete("fail"));
    })
        .catch(params.onShowFail);
};
const paymentRequest = (params) => (WrappedComponent) => (props) => !isSupported
    ? React.createElement(WrappedComponent, __assign({}, props))
    : (React.createElement(WrappedComponent, __assign({}, props, {isSupported: true, show: show(params), abort: abort})));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = paymentRequest;
//# sourceMappingURL=index.js.map