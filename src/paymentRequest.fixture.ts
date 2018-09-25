import { PaymentRequestParams } from './index';

const details: PaymentDetailsInit = {
  total: {
    label: 'Total due',
    amount: { currency: 'USD', value : '22.15' },
  },
};

const getConfig = (onShowFail?: jest.Mock<{}>, removeOptions?: boolean) => ({
  methodData: [{
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa'],
    },
  }],
  details: details,
  options: removeOptions ? undefined : {
    requestShipping: true,
  },
  onShowSuccess: (result, resolve, reject): void => {
    resolve();
  },
  onShowFail,
  onShippingAddressChange: (request, resolve, reject): void => {
    resolve(details);
  },
  onShippingOptionChange: (request, resolve, reject): void => {
    resolve(details);
  },
}) as PaymentRequestParams;

export default getConfig;
