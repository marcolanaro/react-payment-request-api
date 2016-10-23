import * as React from "react";

import paymentRequest from 'react-payment-request-api';
import { PaymentRequestEnancher, PaymentRequestInterface, PaymentRequestParams, Details } from 'react-payment-request-api';

interface OwnProps {
    style: any;
}

const Button: React.StatelessComponent<PaymentRequestInterface & OwnProps> = ({
    show, isSupported, style,
}) => isSupported
    ? <button onClick={show} style={style}>Pay now!</button>
    : <span>Payment request not supported</span>;

const details: Details = {
    displayItems: [{
        label: 'Original donation amount',
        amount: { currency: 'USD', value: '65.00' },
    }, {
        label: 'Friends and family discount',
        amount: { currency: 'USD', value: '-10.00' },
    }],
    total: {
        label: 'Total due',
        amount: { currency: 'USD', value : '55.00' },
    },
};

const PaymentButton = paymentRequest({
    methodData: [{
        supportedMethods: ['visa', 'mastercard', 'diners'],
    }],
    details: details,
    options: {
        requestShipping: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
    },
    onShowSuccess: (result, resolve, reject): void => {
        console.log('result', result);
        // make the payment
        setTimeout(resolve, 2000);
    },
    onShowFail: (error) => alert('Fail!'),
    onShippingAddressChange: (request, resolve, reject): void => {
        console.log('shippingAddress', request.shippingAddress);
        // recalculate details
        details.shippingOptions = [{
            id: 'all',
            label: 'Wherever you want for free',
            amount: { currency: 'USD', value: '0.00' },
            selected: true
        }];
        resolve(details);
    },
    onShippingOptionChange: (request, resolve, reject): void => {
        resolve(details);
    },
} as PaymentRequestParams)(Button);

export default PaymentButton;