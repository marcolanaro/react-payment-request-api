import * as React from 'react';
import { shallow } from 'enzyme';

jest.mock('./normalizeInstrumentations', () => ({
  default: (data: PaymentRequestParams) => data,
}));

import paymentRequest, { PaymentRequestParams, PaymentRequestInterface } from './index';
import getConfig from './paymentRequest.fixture';

declare var global: any; // tslint:disable-line:no-any

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
    const complete = jest.fn();
    const show = jest.fn().mockImplementation(() => Promise.resolve({ complete }));
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
    const wrapper = shallow(<PaymentComponent config={getConfig(onShowFail)} data-test={true} />);

    beforeEach(() => {
      show.mockClear();
      abort.mockClear();
      addEventListener.mockClear();
      onShowFail.mockClear();
    });

    it('should render the UI component', () => {
      expect(wrapper.find(UIComponent).length).toBe(1);
    });

    it('should pass to the UI component the custom props', () => {
      expect(wrapper.find(UIComponent).prop('data-test')).toBe(true);
    });

    it('should not pass to the UI component the config prop', () => {
      expect(wrapper.find(UIComponent).prop('config')).toBe(undefined);
    });

    it('should decorate the UI component with "isSupported" = true', () => {
      expect(wrapper.find(UIComponent).prop('isSupported')).toBe(true);
    });

    describe('when "show" prop is executed', () => {
      describe('PaymentRequest API', () => {
        it('should be executed once', () => {
          wrapper.find(UIComponent).prop('show')();
          expect(PaymentRequest).toHaveBeenCalledTimes(1);
        });
        it('should be executed with', () => {
          wrapper.find(UIComponent).prop('show')();
          expect(PaymentRequest).toHaveBeenCalledWith(getConfig().methodData, getConfig().details, getConfig().options);
        });
      });
      describe('PaymentRequest.addEventListener API', () => {
        it('should be executed twice', () => {
          wrapper.find(UIComponent).prop('show')();
          expect(addEventListener).toHaveBeenCalledTimes(2);
        });
        it('should add an event on shippingaddresschange', () => {
          wrapper.find(UIComponent).prop('show')();
          expect(addEventListener).toHaveBeenCalledWith('shippingaddresschange', expect.any(Function));
        });
        it('should add an event on shippingoptionchange', () => {
          wrapper.find(UIComponent).prop('show')();
          expect(addEventListener).toHaveBeenCalledWith('shippingoptionchange', expect.any(Function));
        });
      });
      describe('PaymentRequest.show API', () => {
        it('should be executed once', () => {
          wrapper.find(UIComponent).prop('show')();
          expect(show).toHaveBeenCalledTimes(1);
        });
        it('should be executed without params', () => {
          wrapper.find(UIComponent).prop('show')();
          expect(show).toHaveBeenCalledWith();
        });
      });
    });

    describe('when "abort" prop is executed after "show"', () => {
      describe('PaymentRequest.abort API', () => {
        it('should be executed once', () => {
          wrapper.find(UIComponent).prop('show')();
          wrapper.find(UIComponent).prop('abort')();
          expect(abort).toHaveBeenCalledTimes(1);
        });
        it('should be executed without params', () => {
          wrapper.find(UIComponent).prop('show')();
          wrapper.find(UIComponent).prop('abort')();
          expect(abort).toHaveBeenCalledWith();
        });
      });
    });
  });
});
