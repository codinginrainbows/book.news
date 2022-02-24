import { AppProps } from 'next/app';
import { useState } from 'react';
import { PrismicProvider } from '@prismicio/react'
import prismicClient from '../services/prismic';

import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import Router from 'next/router';
import Head from 'next/head';

import { Header } from '../components/Header';
import { Loader } from '../components/Loader';

import Nprogress from 'nprogress';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  Nprogress.configure({ showSpinner: false })

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
    // Nprogress is the blue line above
    Nprogress.start()
  })

  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
    Nprogress.done()
  })

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head >

      <NextAuthProvider session={pageProps.session}>
        <PrismicProvider client={prismicClient()}>
          <Header />
          {loading && <Loader />}
          <Component {...pageProps} />
        </PrismicProvider>
      </NextAuthProvider>
    </>
  )
}

export default MyApp;
