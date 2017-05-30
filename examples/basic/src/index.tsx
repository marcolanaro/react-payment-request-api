import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Button from './button';
import getConfig from './config';

const App = () =>
  <Button
    config={getConfig()}
    style={{
      padding: '1rem',
      backgroundColor: 'CornflowerBlue',
      color: 'white',
      fontSize: '10vh',
    }}
  />;

ReactDOM.render(<App />, document.getElementById('app'));
