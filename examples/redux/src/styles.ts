import * as React from 'react';

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    alignItems: 'center',
  } as React.CSSProperties,
  a: {
    color: '#48b5f2',
  },
  h1: {
    fontSize: '1.7rem',
  },
  h2: {
    color: '#0f4b6d',
    fontSize: '1.2rem',
  },
  logo: {
    backgroundImage: 'url(https://raw.githubusercontent.com/marcolanaro/react-payment-request-api/master/logo.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '10rem',
    height: '10rem',
    minWidth: '10rem',
    minHeight: '10rem',
    borderRadius: '0.1875rem',
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  } as React.CSSProperties,
  button: {
    boxShadow: '0 0 1px #fff inset',
    borderRadius: '1rem',
    padding: '1rem 2rem',
    font: '3rem Calibri, Arial, sans-serif',
    textShadow: '1px 1px 0 rgba(255,255,255,0.4)',
  },
  toPay: {
    backgroundColor: '#48b5f2',
    border: '1px solid #84acc3',
    color: '#0f4b6d',
  },
  payed: {
    backgroundColor: '#48f28c',
    border: '1px solid #84c38c',
    color: '#0f6d1c',
  },
};
