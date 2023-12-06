import { Fragment, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { CoffeeStoreContext } from '@/context/coffee-stores';
import { fetchCoffeeStores } from '@/lib/coffee-stores';
import { isEmpty } from '@/utils/helpers';

import cls from 'classnames';
import styles from '@/styles/Coffee-Store.module.css';

export default function CoffeeStore(initialProps) {
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
  const { isFallback, query } = useRouter();

  const { state } = useContext(CoffeeStoreContext);

  const handleCreateCoffeeStore = async () => {
    try {
      const response = await fetch('/api/createCoffeeStore');
    } catch (error) {
      console.error('Error creating coffee store');
      console.error(error);
    }
  };

  useEffect(() => {
    if (isEmpty(coffeeStore) && state.coffeeStores.length > 0) {
      const coffeeStore = state.coffeeStores.find(
        coffeeStore => coffeeStore.id === query.id
      );

      setCoffeeStore(coffeeStore);
    }
  }, [coffeeStore, query.id, state.coffeeStores]);

  if (isFallback) return <div>Loading...</div>;

  const { name, address, neighborhood, imgUrl } = coffeeStore;

  const upvoteBtnHandler = () => {
    console.log('handle upvote');
  };

  return (
    <Fragment>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles['coffee-store-info']}>
          <Link href="/">← Back to Home</Link>
          <p className={styles['coffee-store-title']}>{name}</p>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            alt={name}
            className={styles['coffee-store-image']}
          />
        </div>
        <div className={cls('glass', styles['coffee-store-details'])}>
          <div className={styles['detail-line']}>
            <Image
              src="/icons/places.svg"
              width={24}
              height={24}
              alt="address-icon"
            />
            <p>{address}</p>
          </div>
          <div className={styles['detail-line']}>
            <Image
              src="/icons/near-me.svg"
              width={24}
              height={24}
              alt="neighborhood-icon"
            />
            <p>{neighborhood}</p>
          </div>
          <div className={styles['detail-line']}>
            <Image
              src="/icons/star.svg"
              width={24}
              height={24}
              alt="upvote-icon"
            />
            <p>1</p>
          </div>
          <button className={styles['upvote-btn']} onClick={upvoteBtnHandler}>
            Up vote!
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();

  const coffeeStore = coffeeStores.find(
    coffeeStore => coffeeStore.id === params.id
  );

  return { props: { coffeeStore: coffeeStore ?? {} } };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map(coffeeStore => {
    return { params: { id: coffeeStore.id } };
  });

  return { paths, fallback: true };
}
