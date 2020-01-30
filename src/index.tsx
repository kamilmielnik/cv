import React from 'react';
import { hydrate, render } from 'react-dom';

import App from './App';
import './styles.scss';

const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error('#app element does not exist - cannot mount React app');
}

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
