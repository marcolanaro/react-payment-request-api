import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: './src/index.ts',
  moduleName: 'react-payment-request-api',
  targets: [{ dest: 'dist/react-payment-request-api.min.js', format: 'umd' }],
  plugins: [
    typescript(),
    uglify()
  ],
  exports: 'named',
  external: ['react', 'react-dom'],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
