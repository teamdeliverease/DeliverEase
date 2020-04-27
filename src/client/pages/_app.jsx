/* eslint-disable react/prop-types */
import Head from 'next/head';
import '../styles/scss/theme.scss';
import '../styles/scss/custom.scss';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DeliverEase</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
