import Head from 'next/head';
import Image from 'next/image';

import Banner from '@/components/Banner';
import Card from '@/components/Card';

import coffeeStores from '@/data/coffee-stores.json';

import styles from '@/styles/Home.module.css';

export default function Home(props) {
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
        <div className={styles['card-layout']}>
          {props.coffeeStores.map(coffeeStore => {
            return (
              <Card
                key={coffeeStore.id}
                name={coffeeStore.name}
                imageUrl={coffeeStore.imgUrl}
                href={`coffee-store/${coffeeStore.id}`}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return { props: { coffeeStores } };
}
