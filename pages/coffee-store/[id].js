import Link from 'next/link';
import { useRouter } from 'next/router';

import coffeeStoresData from '@/data/coffee-stores.json';

export default function CoffeeStore() {
  const { query } = useRouter();

  return (
    <div>
      <h1>Coffee Store Page {query.id}</h1>
      <Link href="/">Back to Home</Link>
    </div>
  );
}

export function getStaticProps({ params }) {
  const coffeeStore = coffeeStoresData.find(
    coffeeStore => coffeeStore.id === params.id
  );

  return { props: { coffeeStore } };
}

export function getStaticPaths() {
  return { paths: [{ params: { id: '0' } }, { params: { id: '1' } }] };
}
