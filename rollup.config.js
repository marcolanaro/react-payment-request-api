import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';

export default {
  input: './src/index.ts',
  name: 'react-payment-request-api',
  output: [{ file: 'dist/react-payment-request-api.min.js', format: 'umd' }],
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
