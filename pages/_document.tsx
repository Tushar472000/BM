/* eslint-disable @next/next/no-page-custom-font */
// eslint-disable @next/next/next-script-for-ga
import { Html, Head, Main, NextScript } from 'next/document';
export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/*------------ Google analytics end ---------------- */}
        <meta
          name='google-site-verification'
          content='QpBvmZkQ84PsgRBW9i8i2OnvN0_1yaR8KKOuhQqN14c'
        />
        <meta
          httpEquiv="Content-Security-Policy: default-src 'https://www.bullionmentor.com/'"
          content='upgrade-insecure-requests'
        />

        {/* ------------------- End Google Tag Manager -------------------- */}
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
          rel='stylesheet'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap'
          rel='stylesheet'
          crossOrigin='anonymous'
        />
        <meta
          name='google-signin-client_id'
          content={process.env.GOOGLE_CLIENT_ID}
        />
        <meta
          charSet='utf-8'
          httpEquiv='Content-Security-Policy'
          content="default-src gap://ready file://* *; style-src 'self' http://* https://* 'unsafe-inline'; script-src 'self' http://* https://* 'unsafe-inline' 'unsafe-eval'"
        />
        {/* <link rel='canonical' href={`${process.env.WEBSITE_URL}`} /> */}

      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
