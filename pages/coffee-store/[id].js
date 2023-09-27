import { useRouter } from 'next/router';

export default function CoffeeStore() {
  const { query } = useRouter();

  return <div>Coffee Store Page {query.id}</div>;
}
