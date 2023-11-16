import { Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Banner from '@/components/Banner';
import Card from '@/components/Card';

import coffeeStoresData from '@/data/coffee-stores.json';

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
        {props.coffeeStores.length > 0 && (
          <Fragment>
            <h2 className={styles['sub-heading']}>Toronto stores</h2>
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
          </Fragment>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_FOURSQUARE_PLACES_API_KEY,
    },
  };

  fetch('https://api.foursquare.com/v3/places/search', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  return { props: { coffeeStores: coffeeStoresData } };
}
