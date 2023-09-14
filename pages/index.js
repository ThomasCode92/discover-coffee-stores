import Head from 'next/head';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Find the best coffee shops" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Coffee Connoisseur</h1>
      </main>
    </div>
  );
}
