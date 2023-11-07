import Link from 'next/link';
import { useRouter } from 'next/router';

import coffeeStoresData from '@/data/coffee-stores.json';

export default function CoffeeStore(props) {
  const { query, isFallback } = useRouter();

  if (isFallback) return <div>Loading...</div>;

  return (
    <div>
      <h1>Coffee Store Page {query.id}</h1>
      <p>{props.coffeeStore.name}</p>
      <p>{props.coffeeStore.address}</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const coffeeStore = coffeeStoresData.find(
    coffeeStore => coffeeStore.id === Number(params.id)
  );

  return { props: { coffeeStore } };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '0' } }, { params: { id: '1' } }],
    fallback: true,
  };
}
