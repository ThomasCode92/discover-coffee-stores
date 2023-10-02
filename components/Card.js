import Image from 'next/image';
import Link from 'next/link';

export default function Card({ name, imageUrl, href }) {
  return (
    <Link href={href}>
      <h2>{name}</h2>
      <Image src={imageUrl} alt="coffee store image" width={260} height={160} />
    </Link>
  );
}
