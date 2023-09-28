import Head from 'next/head';

import Banner from '@/components/Banner';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';

export default function Home() {
  const handleClick = () => {
    console.log('Button Clicked!');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Find the best coffee shops" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText={'View stores nearby'} onClick={handleClick} />
        <Image
          src="/images/hero-image.png"
          alt=""
          className={styles['hero-image']}
          width={700}
          height={400}
        />
      </main>
    </div>
  );
}
