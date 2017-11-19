import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'components/app';
import './styles.scss';

const rootElement = document.getElementById('app');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootElement
  );
};

if (module.hot) {
  module.hot.accept('components/app', () => {
    const NextApp = require('components/app').default;
    render(NextApp);
  });
}

render(App);
