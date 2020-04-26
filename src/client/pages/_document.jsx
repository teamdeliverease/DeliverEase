import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash/object';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import FacebookPixel from '../components/FacebookPixel';

class CustomDocument extends Document {
  render() {
    // Store initial props from request data that we need to use again on
    // the client. See:
    // https://github.com/zeit/next.js/issues/3043#issuecomment-334521241
    // https://github.com/zeit/next.js/issues/2252#issuecomment-353992669
    // Alternatively, you could use a store, like Redux.
    const { AuthUserInfo } = this.props;
    return (
      <Html>
        <Head>
          <script
            id="__MY_AUTH_USER_INFO"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(AuthUserInfo, null, 2),
            }}
          />
          {/* bootstrap CSS import */}
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          {/* google font */}
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand:700|Roboto:400,400i,700&display=swap"
            rel="stylesheet"
          />
          <title>DeliverEase</title>
          <meta charset="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta
            name="description"
            content="DeliverEase - helping connect local volunteers with community members in need"
          />
          <meta property="og:title" content="DeliverEase" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="assets/images/shareThumbnail.png" />
          <meta
            property="og:description"
            content="Helping connect local volunteers with community members in need."
          />
          <meta property="og:url" content="https://teamdeliverease.com/" />
          <link rel="shortcut icon" href="favicon.ico" />
          <FacebookPixel />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async (ctx) => {
  // Get the AuthUserInfo object. This is set if the server-rendered page
  // is wrapped in the `withAuthUser` higher-order component.
  const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null);

  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps, AuthUserInfo };
};

CustomDocument.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
    token: PropTypes.string,
  }).isRequired,
};

export default CustomDocument;
