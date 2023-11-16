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

  console.log(props);

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
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    imageUrl={
                      coffeeStore.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                    href={`coffee-store/${coffeeStore.fsq_id}`}
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
  const FOURSQUARE_PLACES_API_KEY = process.env.NEXT_FOURSQUARE_PLACES_API_KEY;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: FOURSQUARE_PLACES_API_KEY,
    },
  };

  const foursquarePlacesUrl =
    'https://api.foursquare.com/v3/places/search?query=coffee&ll=43.68212527466834%2C-79.39961655765684&limit=6';

  const response = await fetch(foursquarePlacesUrl, options);

  const data = await response.json();

  return { props: { coffeeStores: data.results } };
}
