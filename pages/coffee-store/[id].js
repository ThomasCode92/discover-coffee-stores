import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import coffeeStoresData from '@/data/coffee-stores.json';

export default function CoffeeStore(props) {
  const { isFallback } = useRouter();

  if (isFallback) return <div>Loading...</div>;

  const { name, address, neighbourhood } = props.coffeeStore;

  return (
    <Fragment>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/">Back to Home</Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </Fragment>
  );
}

export async function getStaticProps({ params }) {
  const coffeeStore = coffeeStoresData.find(
    coffeeStore => coffeeStore.id === Number(params.id)
  );

  return { props: { coffeeStore } };
}

export async function getStaticPaths() {
  const paths = coffeeStoresData.map(coffeeStore => {
    return { params: { id: coffeeStore.id.toString() } };
  });

  return { paths, fallback: true };
}
