<p align="center">
    <img src="https://raw.githubusercontent.com/marcolanaro/react-payment-request-api/master/logo.png" width=300>
</p>
<p align="center">
  <strong>
    <a href="https://facebook.github.io/react/">React</a> high order component to drive <a href="https://www.w3.org/TR/payment-request/">payment request</a> widget on react applications 💳.
  </strong>
  <br><br>
  <a href="https://npmjs.com/package/react-payment-request-api">
    <img src="https://img.shields.io/npm/v/react-payment-request-api.svg">
  </a>
  <a href="https://github.com/marcolanaro/react-payment-request-api/blob/master/LICENSE.md">
    <img src="https://img.shields.io/github/license/marcolanaro/react-payment-request-api.svg">
  </a>
  <img src="https://img.shields.io/travis/marcolanaro/react-payment-request-api.svg">
  <img src="http://img.badgesize.io/https://unpkg.com/react-payment-request-api/dist/react-payment-request-api.min.js?compression=gzip&label=gzip%20size">
  <img src="http://img.badgesize.io/https://unpkg.com/react-payment-request-api/dist/react-payment-request-api.min.js?label=size">
  <a href="https://npmjs.com/package/react-payment-request-api">
    <img src="https://img.shields.io/npm/dm/react-payment-request-api.svg">
  </a>
</p>


## Browser support

[Payment request api](https://developers.google.com/web/fundamentals/getting-started/primers/payment-request/) is supported on Chrome for desktop v. ^61.0, Chrome for Android and Android Webview v. ^56.0, Microsoft Edge v. ^15.0.

## Demo

You can find a working demo [here](https://lanaro.net/react-payment-request-api/). Be sure to use a supported browser.

## NPM Install

```bash
npm install react-payment-request-api --save
```

## Usage

Consume the UI component in the hight order component `button.js`:

```js
import React from "react";
import paymentRequest from 'react-payment-request-api';

const Button = ({ show, isSupported }) => isSupported
    ? <button onClick={show}>Pay now!</button>
    : <span>Payment request not supported</span>;

export default paymentRequest<OwnProps>()(Button);
```

Pass the configuration to the high order component `smartComponent.js`:

```js
import React from "react";

import Button from "./button";

const SmartComponent = (config) =>
  <Button config={config} foo="bar" />;

export default SmartComponent;
```

## FAQ

#### How does it work?

It takes a configuration prop that define how the native widget should behave and any other property you want to pass to the UI component. It spread all the properties a part from the configuration to the enhanced UI component. The UI component will also receive other props that will help improving the experience allowing complete control on the renderer and on the action handler.

#### Does it support Redux or any other flux implementation?

Yes, with version 1.0 we have changed the interface allowing the user to inject the configuration from the parent component. In this way it does not matter which flux implementation you are using. At the same time, we are preserving the high order component pattern so you have complete control on the renderer and on the action handler.

#### Does it support Typescript?

Yes, you don't need to install any typescript dependecies because types come with the library. It export `PaymentRequestParams` (injected configuration) and `PaymentRequestInterface` (UI component extended props) typescript interfaces. All the [examples](https://github.com/marcolanaro/react-payment-request-api/tree/master/examples) are written in typescript.

## API

Your wrapped component will be decorated with this injected props:

Parameter   | Type                           | Description
----------- | ------------------------------ | -----------
isSupported | boolean                        | True if the payment request api is supported by the browser.
show        | function: () => PaymentRequest | It will begin the process when the merchant site want to create a new [PaymentRequest](https://www.w3.org/TR/payment-request/#paymentrequest-interface).
abort       | function: () => void           | You can intentionally [abort a PaymentRequest](https://www.w3.org/TR/payment-request/#abort) by calling the abort method after show has been called.

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
onMerchantValidation    |  Promise based callback: (event)                   | Thde handler is used by Apple pay to [validate the merchant](https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/providing_merchant_validation).

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
