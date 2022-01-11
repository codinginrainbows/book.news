import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>News App</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.textContainer}>
          <h1>News about <br /> <span>React</span> world.</h1>

          <p>Get acess to all publications <br />
            <span>for $9.90 monthly</span>
          </p>

          <SubscribeButton />
        </section>
        <section className={styles.imageContainer}>
          <img src="/images/avatar.svg" alt="Girl coding" />
        </section>
      </main>
    </>
  )
}