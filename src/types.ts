export type Resolve = (value?: {} | PromiseLike<{}>) => void;
export type Reject = (reason?: any) => void; // tslint:disable-line:no-any
export type Callback = (request: PaymentRequest, resolve: Resolve, reject: Reject) => void;

export type PaymentRequestParams = {
  methodData: PaymentMethodData[];
  details: PaymentDetailsInit;
  options?: PaymentOptions;
  onShowSuccess: (paymentResponse: PaymentResponse, resolve: Resolve, reject: Reject) => void;
  onShowFail: (err: string) => void;
  onShippingAddressChange?: Callback;
  onShippingOptionChange?: Callback;
  onMerchantValidation?: Callback;
};

export interface PaymentRequestParamsConfig {
  config: PaymentRequestParams;
}

export interface PaymentRequestInterface {
  isSupported: boolean;
  show: () => void;
  abort: () => void;
}
