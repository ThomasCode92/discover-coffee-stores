import Image from 'next/image';
import Link from 'next/link';
import cls from 'classnames';

import styles from './Card.module.css';

export default function Card({ name, imageUrl, href }) {
  return (
    <Link href={href}>
      <div className={cls('glass', styles.container)}>
        <h2 className={styles['card-header']}>{name}</h2>
        <Image
          src={imageUrl}
          alt="coffee store image"
          className={styles['card-image']}
          width={260}
          height={160}
        />
      </div>
    </Link>
  );
}
