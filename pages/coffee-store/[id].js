import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { fetchCoffeeStores } from '@/lib/coffee-stores';

import cls from 'classnames';
import styles from '@/styles/Coffee-Store.module.css';

export default function CoffeeStore(props) {
  const { isFallback } = useRouter();

  if (isFallback) return <div>Loading...</div>;

  const { name, address, neighborhood, imgUrl } = props.coffeeStore;

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
            src={imgUrl}
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

  return { props: { coffeeStore } };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map(coffeeStore => {
    return { params: { id: coffeeStore.id } };
  });

  return { paths, fallback: true };
}
