/* eslint-disable react/prop-types */
import Head from 'next/head';
import '../styles/scss/theme.scss';
import '../styles/scss/custom.scss';
import 'react-phone-input-2/lib/bootstrap.css';

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
