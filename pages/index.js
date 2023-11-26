import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Banner from '@/components/Banner';
import Card from '@/components/Card';

import useTrackLocation from '@/hooks/use-track-location';
import { fetchCoffeeStores } from '@/lib/coffee-stores';

import styles from '@/styles/Home.module.css';

export default function Home(props) {
  const [coffeeStores, setCoffeeStores] = useState([]);
  const [error, setError] = useState(null);

  const { latLong, isFindingLocation, locationError, handleTrackLocation } =
    useTrackLocation();

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (!latLong) return;

      try {
        const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 10);
        setCoffeeStores(fetchedCoffeeStores);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }

    setCoffeeStoresByLocation();
  }, [latLong]);

  const clickHandler = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Find the best coffee shops" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
          errorMessage={locationError || (error && error.message)}
          onClick={clickHandler}
        />
        <Image
          src="/images/hero-image.png"
          alt=""
          className={styles['hero-image']}
          width={700}
          height={400}
        />
        {coffeeStores.length > 0 && (
          <Fragment>
            <h2 className={styles['sub-heading']}>Stores near me</h2>
            <div className={styles['card-layout']}>
              {coffeeStores.map(coffeeStore => {
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
  const coffeeStores = await fetchCoffeeStores();
  return { props: { coffeeStores } };
}
