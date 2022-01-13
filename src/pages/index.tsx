import { GetStaticProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/api';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

// Product is a prop that comes from the API call below and It lets us to display data on the page
export default function Home({ product }: HomeProps) {

  return (
    <>
      <Head>
        <title>News App</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.textContainer}>
          <h1>News about <br /> <span>React</span> world.</h1>

          <p>Get acess to all publications <br />
            <span>for {product.amount} monthly</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>
        <section className={styles.imageContainer}>
          <img src="/images/avatar.svg" alt="Girl coding" />
        </section>
      </main>
    </>
  )
}

// Making the API call from node server. Also, It only works in page files. It's not meant to be used in components!
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KHA6SJwx3rvawH7cYrondGR');

  const product = {
    priceId: price.id,
    // Divided by 100 'cause price comes in cents.
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24 //24 hours in seconds
  }
}