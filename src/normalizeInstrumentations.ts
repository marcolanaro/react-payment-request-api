export default (methodData: PaymentMethodData[]) => {
  const preChrome57PaymentMethodData = methodData
    .reduce((prec: PaymentMethodData, paymentMethodData: PaymentMethodData) => {
      if (paymentMethodData.supportedMethods && paymentMethodData.supportedMethods[0] === 'basic-card') {
        const basicCardPaymentMethodData = paymentMethodData;
        if (basicCardPaymentMethodData.data && !!basicCardPaymentMethodData.data.supportedNetworks) {
          return { supportedMethods: basicCardPaymentMethodData.data.supportedNetworks };
        }
      }
      return prec;
    }, null);
  return preChrome57PaymentMethodData
    ? [ preChrome57PaymentMethodData, ...methodData ]
    : [ ...methodData ];
};
