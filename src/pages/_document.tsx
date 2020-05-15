import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import { name, description } from 'data';

const DESCRIPTION = `${name} - ${description} - Curriculum Vitae`;

const KEYWORDS = [
  name,
  'CV',
  'Curriculum Vitae',
  'Resume',
  'JavaScript',
  'JS',
  'TypeScript',
  'TS',
  'React',
  'Frontend',
  'Front-end',
  'Front end'
].join(',');

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="author" content={name} />
          <meta name="description" content={DESCRIPTION} />
          <meta name="keywords" content={KEYWORDS} />
          <meta name="robots" content="index, follow, notranslate, noimageindex" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="yandex-verification" content="16d36b53b8588de0" />
          <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
          <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
