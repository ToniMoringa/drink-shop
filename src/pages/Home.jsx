import { Link } from 'react-router-dom';
import { Coffee, ArrowRight } from 'lucide-react';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <Coffee size={80} className={styles.icon} />
        <h1 className={styles.title}>Pixel Brew Café</h1>
        <p className={styles.tagline}>Cute pixel drinks for cozy souls ☕✨</p>
        <Link to="/shop" className={styles.button}>
          Browse Drinks <ArrowRight size={20} />
        </Link>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>🎨</span>
          <h3>Pixel Art Drinks</h3>
          <p>Hand-crafted pixel art for each beverage</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>🍵</span>
          <h3>Fresh & Cozy</h3>
          <p>Hot and cold drinks made with love</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>💝</span>
          <h3>Made for You</h3>
          <p>Customizable to your taste</p>
        </div>
      </div>
    </div>
  );
}
