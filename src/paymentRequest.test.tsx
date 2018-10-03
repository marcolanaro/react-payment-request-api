import * as React from 'react';
import { shallow } from 'enzyme';

import paymentRequest, { PaymentRequestParams, PaymentRequestInterface } from './index';
import getConfig from './paymentRequest.fixture';

declare var global: any; // tslint:disable-line:no-any

const generator = (removeOptions: boolean = false, showMethod: string = 'resolve') => {
  const complete = jest.fn();
  const showResponse = showMethod === 'resolve' ? { complete } : 'error';
  const show = jest.fn().mockImplementation(() => Promise[showMethod](showResponse));
  const abort = jest.fn();
  const addEventListener = jest.fn().mockImplementation((event: string) => {}); // tslint:disable-line:no-empty
  const onShowFail = jest.fn();
  const PaymentRequest = jest.fn().mockImplementation(() => ({ // tslint:disable-line:no-any
    show,
    abort,
    addEventListener,
  }));

  global.window.PaymentRequest = PaymentRequest;

  const UIComponent: React.StatelessComponent<PaymentRequestInterface> = () => <div />;
  const PaymentComponent = paymentRequest<{}>()(UIComponent);
  const wrapper = shallow(<PaymentComponent config={getConfig(onShowFail, removeOptions)} data-test={true} />);
  return {
    complete,
    show,
    abort,
    addEventListener,
    onShowFail,
    PaymentRequest,
    UIComponent,
    PaymentComponent,
    wrapper,
  };
};

describe('PaymentRequest', () => {
  describe('given an environment with no support for the API', () => {
    const UIComponent = () => <div />;
    const PaymentComponent = paymentRequest<{}>()(UIComponent);
    const config = {} as PaymentRequestParams;
    const wrapper = shallow(<PaymentComponent config={config} data-test={true} />);

    it('should render the UI component', () => {
      expect(wrapper.find(UIComponent).length).toBe(1);
    });

    it('should pass to the UI component the custom props', () => {
      expect(wrapper.find(UIComponent).prop('data-test')).toBe(true);
    });

    it('should not pass to the UI component the config prop', () => {
      expect(wrapper.find(UIComponent).prop('config')).toBe(undefined);
    });

    it('should decorate the UI component with "isSupported" = false', () => {
      expect(wrapper.find(UIComponent).prop('isSupported')).toBe(false);
    });

    it('should not decorate the UI component with "show" prop', () => {
      expect(wrapper.find(UIComponent).prop('show')).toBe(undefined);
    });

    it('should not decorate the UI component with "abort" prop', () => {
      expect(wrapper.find(UIComponent).prop('abort')).toBe(undefined);
    });
  });

  describe('given an environment with support for the API', () => {
    it('should render the UI component', () => {
      const { wrapper, UIComponent } = generator();
      expect(wrapper.find(UIComponent).length).toBe(1);
    });

    it('should pass to the UI component the custom props', () => {
      const { wrapper, UIComponent } = generator();
      expect(wrapper.find(UIComponent).prop('data-test')).toBe(true);
    });

    it('should not pass to the UI component the config prop', () => {
      const { wrapper, UIComponent } = generator();
      expect(wrapper.find(UIComponent).prop('config')).toBe(undefined);
    });

    it('should decorate the UI component with "isSupported" = true', () => {
      const { wrapper, UIComponent } = generator();
      expect(wrapper.find(UIComponent).prop('isSupported')).toBe(true);
    });

    describe('when "show" prop is executed', () => {
      describe('PaymentRequest API', () => {
        it('should be executed once', () => {
          const { wrapper, UIComponent } = generator();
          wrapper.find(UIComponent).prop('show')();
          expect(PaymentRequest).toHaveBeenCalledTimes(1);
        });

        it('should be executed with config.methodData, config.details, config.options', () => {
          const { wrapper, UIComponent } = generator();
          wrapper.find(UIComponent).prop('show')();
          expect(PaymentRequest).toHaveBeenCalledWith(getConfig().methodData, getConfig().details, getConfig().options);
        });

        it('should force empty options if not provided', () => {
          const { wrapper, UIComponent } = generator(true);
          wrapper.find(UIComponent).prop('show')();
          expect(PaymentRequest).toHaveBeenCalledWith(getConfig().methodData, getConfig().details, {});
        });
      });

      describe('PaymentRequest.addEventListener API', () => {
        it('should be executed twice', () => {
          const { wrapper, UIComponent, addEventListener } = generator();
          wrapper.find(UIComponent).prop('show')();
          expect(addEventListener).toHaveBeenCalledTimes(3);
        });

        it('should add an event on shippingaddresschange', () => {
          const { wrapper, UIComponent, addEventListener } = generator();
          wrapper.find(UIComponent).prop('show')();
          expect(addEventListener).toHaveBeenCalledWith('shippingaddresschange', expect.any(Function));
        });

        it('should add an event on shippingoptionchange', () => {
          const { wrapper, UIComponent, addEventListener } = generator();
          wrapper.find(UIComponent).prop('show')();
          expect(addEventListener).toHaveBeenCalledWith('shippingoptionchange', expect.any(Function));
        });

        it('should add an event on onmerchantvalidation', () => {
          const { wrapper, UIComponent, addEventListener } = generator();
          wrapper.find(UIComponent).prop('show')();
          expect(addEventListener).toHaveBeenCalledWith('onmerchantvalidation', expect.any(Function));
        });
      });

      describe('PaymentRequest.show API', () => {
        it('should be executed once', () => {
          const { wrapper, UIComponent, show } = generator();
          wrapper.find(UIComponent).prop('show')();
          expect(show).toHaveBeenCalledTimes(1);
        });

        it('should be executed without params', () => {
          const { wrapper, UIComponent, show } = generator();
          wrapper.find(UIComponent).prop('show')();
          expect(show).toHaveBeenCalledWith();
        });
      });
    });

    describe('when PaymentRequest.show API is resolved', () => {
      describe('PaymentResponse.complete API', () => {
        it('should be executed once', () => {
          const { wrapper, UIComponent, complete } = generator();
          wrapper.find(UIComponent).prop('show')();
          return Promise.resolve().then(() =>
            Promise.resolve().then(() =>
              expect(complete).toHaveBeenCalledTimes(1)
            )
          );
        });

        it('should be executed with "success"', () => {
          const { wrapper, UIComponent, complete } = generator();
          wrapper.find(UIComponent).prop('show')();
          return Promise.resolve().then(() =>
            Promise.resolve().then(() =>
              expect(complete).toHaveBeenCalledWith('success')
            )
          );
        });
      });

      describe('config.onShowFail', () => {
        it('should not be executed', () => {
          const { wrapper, UIComponent, onShowFail } = generator();
          wrapper.find(UIComponent).prop('show')();
          return Promise.resolve().then(() =>
            Promise.resolve().then(() =>
              expect(onShowFail).toHaveBeenCalledTimes(0)
            )
          );
        });
      });
    });

    describe('when PaymentRequest.show API is rejected', () => {
      describe('PaymentResponse.complete API', () => {
        it('should not be executed', () => {
          const { wrapper, UIComponent, complete } = generator(false, 'reject');
          wrapper.find(UIComponent).prop('show')();
          return Promise.resolve().then(() =>
            Promise.resolve().then(() =>
              expect(complete).toHaveBeenCalledTimes(0)
            )
          );
        });
      });

      describe('config.onShowFail', () => {
        it('should be executed once', () => {
          const { wrapper, UIComponent, onShowFail } = generator(false, 'reject');
          wrapper.find(UIComponent).prop('show')();
          return Promise.resolve().then(() =>
            Promise.resolve().then(() =>
              expect(onShowFail).toHaveBeenCalledTimes(1)
            )
          );
        });

        it('should be executed with error', () => {
          const { wrapper, UIComponent, onShowFail } = generator(false, 'reject');
          wrapper.find(UIComponent).prop('show')();
          return Promise.resolve().then(() =>
            Promise.resolve().then(() =>
              expect(onShowFail).toHaveBeenCalledWith('error')
            )
          );
        });
      });
    });

    describe('when "abort" prop is executed after "show"', () => {
      describe('PaymentRequest.abort API', () => {
        it('should be executed once', () => {
          const { wrapper, UIComponent, abort } = generator();
          wrapper.find(UIComponent).prop('show')();
          wrapper.find(UIComponent).prop('abort')();
          expect(abort).toHaveBeenCalledTimes(1);
        });

        it('should be executed without params', () => {
          const { wrapper, UIComponent, abort } = generator();
          wrapper.find(UIComponent).prop('show')();
          wrapper.find(UIComponent).prop('abort')();
          expect(abort).toHaveBeenCalledWith();
        });
      });
    });
  });
});
