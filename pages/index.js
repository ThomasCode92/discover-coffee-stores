import { Fragment, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Banner from '@/components/Banner';
import Card from '@/components/Card';

import useTrackLocation from '@/hooks/use-track-location';
import { ACTION_TYPES, CoffeeStoreContext } from '@/context/coffee-stores';
import { fetchCoffeeStores } from '@/lib/coffee-stores';

import styles from '@/styles/Home.module.css';

export default function Home(props) {
  const [error, setError] = useState(null);

  const { state, dispatch } = useContext(CoffeeStoreContext);

  const { isFindingLocation, locationError, handleTrackLocation } =
    useTrackLocation();

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (!state.latLong) return;

      try {
        const getCoffeeStoresApiUrl = `/api/getCoffeeStoresByLocation?latLong=${state.latLong}`;

        const response = await fetch(getCoffeeStoresApiUrl);
        const data = await response.json();

        dispatch({
          type: ACTION_TYPES.SET_COFFEE_STORES,
          payload: { coffeeStores: data.coffeeStores },
        });
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }

    setCoffeeStoresByLocation();
  }, [dispatch, state.latLong]);

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
          onClick={handleTrackLocation}
        />
        <Image
          src="/images/hero-image.png"
          alt=""
          className={styles['hero-image']}
          width={700}
          height={400}
        />
        {state.coffeeStores.length > 0 && (
          <Fragment>
            <h2 className={styles['sub-heading']}>Stores near me</h2>
            <div className={styles['card-layout']}>
              {state.coffeeStores.map(coffeeStore => {
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
