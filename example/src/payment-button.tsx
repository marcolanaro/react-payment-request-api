import paymentRequest from 'react-payment-request-api';
import { PaymentRequestParams, Details } from 'react-payment-request-api';

import Button from './button';

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

const config = {
  methodData: [{
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa', 'mastercard', 'diners'],
    },
  }],
  details: details,
  options: {
    requestShipping: true,
    requestPayerEmail: true,
    requestPayerPhone: true,
  },
  onShowSuccess: (result, resolve, reject): void => {
    /* tslint:disable-next-line:no-console */
    console.log('Result:', result);
    // make the payment
    setTimeout(resolve, 2000);
  },
  /* tslint:disable-next-line:no-console */
  onShowFail: (error) => console.log('Error', error),
  onShippingAddressChange: (request, resolve, reject): void => {
    /* tslint:disable-next-line:no-console */
    console.log('ShippingAddress:', request.shippingAddress);
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
} as PaymentRequestParams;

export default paymentRequest(config)(Button);
