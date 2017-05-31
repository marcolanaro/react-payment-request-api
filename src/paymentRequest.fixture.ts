import { PaymentRequestParams } from './index';

const details: PaymentDetails = {
  displayItems: [],
  total: {},
};

const getConfig = (onShowFail?: jest.Mock<{}>) => ({
  methodData: [{
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa'],
    },
  }],
  details: details,
  options: {
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
