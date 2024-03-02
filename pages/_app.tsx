import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/Layout';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Script from 'next/script';
import Head from 'next/head';
import data from '@/data';
export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }, []);
  let persistor = persistStore(store);
  return (
    <>
      <Head>
        <title>{pageProps?.title}</title>
        <meta name='description' content={pageProps?.description} key='desc' />
        <meta property='og:type' content={data.OGTags.home.type} />
        <meta property='og:title' content={pageProps?.title} />
        <meta property='og:description' content={pageProps?.description} />
        {/* <meta property='og:url' content={`${process.env.WEBSITE_URL}`} /> */}
        {/* <meta
          property='og:image'
          content='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/thumbnail.webp' // Path to your thumbnail image
        /> */}
        {/* <link rel='canonical' href={`${process.env.WEBSITE_URL}`} /> */}
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SessionProvider session={session}>
            <Layout>
             
              {/*------------ Google analytics start ---------------- */}
              <Script async defer id='google-analytics'>
                {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H1CHYCNFQV');
              `}
              </Script>
               <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
