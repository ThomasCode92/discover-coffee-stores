import styles from './Banner.module.css';

export default function Banner({ buttonText, onClick }) {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        Coffee <span>Connoisseur</span>
      </h1>
      <p className={styles['sub-title']}>Discover your local coffee shops!</p>
      <div className={styles['button-wrapper']}>
        <button className={styles.button} onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </header>
  );
}
