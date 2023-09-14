import styles from '@/styles/Banner.module.css';

export default function Banner({ buttonText, onClick }) {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        Coffee <span>Connoisseur</span>
      </h1>
      <p className={styles.subtitle}>Discover your local coffee shops!</p>
      <button className={styles.button} onClick={onClick}>
        {buttonText}
      </button>
    </header>
  );
}
