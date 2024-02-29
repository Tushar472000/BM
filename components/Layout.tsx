import Head from 'next/head';
import { LayoutProps } from '@/interfaces/typeinterfaces';
import Header from './Header';
import { NextRequest } from 'next/server';
import dynamic from 'next/dynamic';
// -------------------------- Dynamic import -------------------//
const Footer = dynamic(() => import('./Footer'));

export default function Layout({ children }: LayoutProps, req: NextRequest) {

  const addProductJsonLd = () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Bullion Mentor",
        "url": "https://www.bullionmentor.com/",
        "logo": "https://res.cloudinary.com/bold-pm/image/upload/BBD/BM-logo.png"
      }`
    };
    }
    else {return {__html:``}}
  };
  const facebookScript = () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
    return { __html: `
    !function(e,t,n,c,o,a,f){e.fbq||(o=e.fbq=function(){o.callMethod?o.callMethod.apply(o,arguments):o.queue.push(arguments)},e._fbq||(e._fbq=o),o.push=o,o.loaded=!0,o.version="2.0",o.queue=[],(a=t.createElement(n))["async"]=!0,a.src="https://connect.facebook.net/en_US/fbevents.js",(f=t.getElementsByTagName(n)[0]).parentNode.insertBefore(a,f))}(window,document,"script"),fbq("init","1280782345653908"),fbq("track","PageView");
      `}
    }
    else {return {__html:``}}
  };
  const noscriptfb = () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
    return {__html: `
    <img height="1" width="1" style="display:none" loading="lazy"
    src="https://www.facebook.com/tr?id=1280782345653908&ev=PageView&noscript=1"
    />
    `
    }
    }
    else {return {__html:``}}
  }
    return (
      <>
        <Head>
          <link
            rel='icon'
            href='https://res.cloudinary.com/bold-pm/image/upload/BBD/BM-favicon.png'
            className='object-cover'
          />
          <script async defer
            type='application/ld+json'
            dangerouslySetInnerHTML={addProductJsonLd()}
            key='product-jsonld'
          />
          <link
            rel='preload'
            as='image'
            href='https://res.cloudinary.com/bold-pm/image/upload/BBD/subscribe-bg.webp'
          />
          <script async defer
            dangerouslySetInnerHTML={facebookScript()}
          />
          <noscript
            dangerouslySetInnerHTML={noscriptfb()}
          />
        </Head>
        <Header />
        <main className='min-h-screen pt-[66px] lg:pt-[100px]'>{children}</main>
        <Footer />
      </>
    );
  }
