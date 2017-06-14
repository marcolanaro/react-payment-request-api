import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Button from './button';
import getConfig from './config';
import styles from './styles';

const App = () =>
  <div style={styles.container}>
    <div style={styles.logo} />
    <h1 style={styles.h1}>React Payment Request API</h1>
    <h2 style={styles.h2}>
      High order component to drive &nbsp;
      <a href="https://www.w3.org/TR/payment-request/" target="_blank" style={styles.a}>Payment Request</a>
      &nbsp; widget on react applications 💳
    </h2>
    <p>This component accept a standalone configuration and will log the result on the console.</p>
    <div style={styles.content}>
      <Button config={getConfig()} style={styles.button} />
    </div>
  </div>;

ReactDOM.render(<App />, document.getElementById('app'));
