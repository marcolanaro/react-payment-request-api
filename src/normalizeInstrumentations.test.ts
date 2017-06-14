import normalizeInstrumentations from './normalizeInstrumentations';

describe('normalizeInstrumentations', () => {

  describe('when instrumentations does not contain basicCard', () => {
    it('should return the same instrumentations', () => {
      const instrumentations = [] as PaymentMethodData[];

      expect(normalizeInstrumentations(instrumentations)).toEqual(instrumentations);
    });
  });

  describe('when instrumentations contains basicCard but no supportedNetworks', () => {
    it('should return the same instrumentations when no data is defined', () => {
      const instrumentations = [{
        supportedMethods: ['basic-card'],
      }] as PaymentMethodData[];

      expect(normalizeInstrumentations(instrumentations)).toEqual(instrumentations);
    });
    it('should return the same instrumentations when data is empty', () => {
      const instrumentations = [{
        supportedMethods: ['basic-card'],
        data: {},
      }] as PaymentMethodData[];

      expect(normalizeInstrumentations(instrumentations)).toEqual(instrumentations);
    });
  });

  describe('when instrumentations contains basicCard and supportedNetworks', () => {
    it('should enhance instrumentations with pre-chrome57 api and same supportedNetworks of basicCard', () => {
      const instrumentations = [{
        supportedMethods: ['basic-card'],
        data: {
          supportedNetworks: ['visa', 'mastercard'],
        },
      }] as PaymentMethodData[];

      expect(normalizeInstrumentations(instrumentations)).toEqual([
        {
          supportedMethods: ['visa', 'mastercard'],
        },
        ...instrumentations,
      ]);
    });
  });

});
