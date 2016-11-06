<p align="center">
    <img src="https://raw.githubusercontent.com/marcolanaro/react-payment-request-api/master/logo.png" width=300>
</p>
<p align="center">
  <strong>
    <a href="https://facebook.github.io/react/">React</a> high order component that expose the standard <a href="https://www.w3.org/TR/payment-request/">payment request api</a>.
  </strong>
</p>


## Browser support

At the moment the [payment request api](https://developers.google.com/web/fundamentals/getting-started/primers/payment-request/) is supported on Chrome for Android and Android Webview v. ^53.0.

## NPM Install

```bash
npm install react-payment-request-api --save
```

## What's it look like?

Consume the wrapped component:

```js
import React from "react";

const Button = ({ show, isSupported }) => isSupported
    ? <button onClick={show}>Pay now!</button>
    : <span>Payment request not supported</span>;

export default Button;
```

Configure the high order component:

```js
import React from "react";
import paymentRequest from "react-payment-request-api";

import YourButtonComponent from "./button";

const details = {
    displayItems: [{
        label: "Original donation amount",
        amount: { currency: "USD", value: "65.00" },
    }, {
        label: "Friends and family discount",
        amount: { currency: "USD", value: "-10.00" },
    }],
    total: {
        label: "Total due",
        amount: { currency: "USD", value : "55.00" },
    },
};

const config = {
    methodData: [{
        supportedMethods: ["visa", "mastercard", "diners"],
    }],
    details: details,
    options: {
        requestShipping: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
    },
    onShowSuccess: (result, resolve, reject) => {
        console.log("result", result);
        // make the payment
        setTimeout(resolve, 2000);
    },
    onShowFail: (error) => alert("Fail!"),
    onShippingAddressChange: (request, resolve, reject) => {
        console.log("shippingAddress", request.shippingAddress);
        // recalculate details
        details.shippingOptions = [{
            id: "all",
            label: "Wherever you want for free",
            amount: { currency: "USD", value: "0.00" },
            selected: true
        }];
        resolve(details);
    },
    onShippingOptionChange: (request, resolve, reject) => {
        // recalculate details
        resolve(details);
    },
};

export default paymentRequest(config)(YourButtonComponent);
```

## What if I use Redux?

In this case you can define the configuration as a function that accept two parameters. The parameters will be the `dispatch` and `getState` functions that will permit you to interact with the store in the lifecycle of the payment request.

```js
import React from "react";
import paymentRequest from "react-payment-request-api";

import YourButtonComponent from "./button";

const config = (dispatch, getState) => ({
    ...,
    onShowSuccess: (result, resolve, reject): void => {
        dispatch({ TYPE: 'MAKE_PAYMENT' });
            .then(_ => resolve());
    },
    onShippingAddressChange: (request, resolve, reject) => {
        resolve(selectNewDetails(getState(), request));
    },
    ...,
});

export default paymentRequest(config)(YourButtonComponent);
```

## API

Your wrapped component will be decorated with this injected props:

Parameter   | Type                           | Description
----------- | ------------------------------ | -----------
isSupported | boolean                        | True if the payment request api is supported by the browser.
show        | function: () => PaymentRequest | It will begin the process when the merchant site want to create a new [PaymentRequest](https://www.w3.org/TR/payment-request/#paymentrequest-interface).
abort       | function: () => void           | You can intentionally [abort a PaymentRequest](https://www.w3.org/TR/payment-request/#abort) by calling the abort method.

Configuration of the high order component:

Parameter               | Type                                               | Description
----------------------- | -------------------------------------------------- | -----------
methodData              | object                                             | Required [payment method data](https://www.w3.org/TR/payment-request/#idl-def-paymentmethoddata).
details                 | object                                             | Required information about [transaction](https://www.w3.org/TR/payment-request/#dom-paymentdetails).
options                 | object                                             | [Optional parameter](https://www.w3.org/TR/payment-request/#dom-paymentoptions) for things like shipping, etc.
onShowSuccess           | Promise based callback: (result, resolve, reject)  | The handler will be executed after the filling of the form is [successfull](https://www.w3.org/TR/payment-request/#dfn-complete). You should post your payment request and then resolve or reject the promise. 
onShowFail              | Promise based callback: (error)                    | The handler will be executed if the filling of the form is [not successfull](https://www.w3.org/TR/payment-request/#dom-paymentcomplete-fail) (like when the user dismiss the form).
onShippingAddressChange | Promise based callback: (request, resolve, reject) | The handler will be executed if the [shipping address has change](https://www.w3.org/TR/payment-request/#idl-def-paymentrequestupdateevent). You can change the request and then resolve the promise.
onShippingOptionChange  | Promise based callback: (request, resolve, reject) | The handler will be executed if the [shipping option has change](https://www.w3.org/TR/payment-request/#idl-def-paymentrequestupdateevent). You can change the request and then resolve the promise.

## Typescript

Typescript is completely optional. The package is exported as ES6/commonjs module.<br />
The types are exported under `dist/types.d.ts`. You can find an example of usage [here](https://github.com/marcolanaro/react-payment-request-api/tree/master/examples).


## License

<img src="https://opensource.org/files/osi_keyhole_300X300_90ppi_0.png" height="150"/>

The MIT License (MIT)

Copyright (c) 2016-present, Marco Lanaro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
