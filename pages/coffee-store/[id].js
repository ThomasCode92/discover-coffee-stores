import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CoffeeStore() {
  const { query } = useRouter();

  return (
    <div>
      <h1>Coffee Store Page {query.id}</h1>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
