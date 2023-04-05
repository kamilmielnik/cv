import { AppProps } from 'next/app';
import Head from 'next/head';

import data from 'data';

import 'styles/global.scss';
import 'styles/variables.scss';

const DESCRIPTION = `${data.name} - ${data.description} - Curriculum Vitae`;

const KEYWORDS = [
  data.name,
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

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>{data.name} - CV</title>
      <meta charSet="utf-8" />
      <meta name="author" content={data.name} />
      <meta name="description" content={DESCRIPTION} />
      <meta name="keywords" content={KEYWORDS} />
      <meta name="robots" content="index, follow, notranslate, noimageindex" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <Component {...pageProps} />
  </>
);

export default App;
