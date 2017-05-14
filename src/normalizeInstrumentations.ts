import {
  Instrumentations,
  Instrumentation,
  BasicCardInstrumentation,
} from './types';

export default (methodData: Instrumentations) => {
  const preChrome57Instrumentations = methodData.reduce((prec: null | Instrumentation, instrumentation: Instrumentation) => {
    if (instrumentation.supportedMethods[0] === 'basic-card') {
      const basicCardInstrumentation = instrumentation as BasicCardInstrumentation;
      if (basicCardInstrumentation.data) {
        return { supportedMethods: basicCardInstrumentation.data.supportedNetworks };
      }
    }
    return prec;
  }, null);
  return preChrome57Instrumentations
    ? [ preChrome57Instrumentations, ...methodData ]
    : [ ...methodData ];
};
