import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';

import { PrismicProvider } from '@prismicio/react'
import { prismicClient } from '../services/prismic';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PrismicProvider client={prismicClient}>
        <Header />
        <Component {...pageProps} />
      </PrismicProvider>
    </NextAuthProvider>
  )
}

export default MyApp;
