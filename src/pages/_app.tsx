import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { name } from 'data';

import 'styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>{name} - CV</title>
    </Head>

    <Component {...pageProps} />
  </>
);

export default App;
