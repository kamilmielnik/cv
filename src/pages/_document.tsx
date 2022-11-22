import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Open+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
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
