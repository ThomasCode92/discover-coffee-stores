import Head from 'next/head';
import Image from 'next/image';

import Banner from '@/components/Banner';
import Card from '@/components/Card';

import styles from '@/styles/Home.module.css';

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
        <Card
          name="DarkHorse Coffee"
          imageUrl="/images/hero-image.png"
          href="/coffee-store/darkhorse-coffee"
        />
      </main>
    </div>
  );
}
