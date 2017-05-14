import normalizeInstrumentations from './normalizeInstrumentations';
import { Instrumentations } from './types';

describe('normalizeInstrumentations', () => {

  describe('when instrumentations does not contain basicCard', () => {
    it('should return the same instrumentations', () => {
      const instrumentations = [] as Instrumentations;

      expect(normalizeInstrumentations(instrumentations)).toEqual(instrumentations);
    });
  });

  describe('when instrumentations contains basicCard but no supportedNetworks', () => {
    it('should return the same instrumentations', () => {
      const instrumentations = [{
        supportedMethods: ['basic-card'],
      }] as Instrumentations;

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
      }] as Instrumentations;

      expect(normalizeInstrumentations(instrumentations)).toEqual([
        {
          supportedMethods: ['visa', 'mastercard'],
        },
        ...instrumentations,
      ]);
    });
  });

});
