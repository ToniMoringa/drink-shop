import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Sparkles, Coffee, ArrowRight } from 'lucide-react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.heroBackground}></div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Sparkles
              size={16}
              style={{ display: 'inline', marginRight: '4px' }}
            />
            20% Off All Drinks - with code AE3PXL
          </div>

          <h1 className={styles.heroTitle}>Tasty Drinks for Pixel Hearts</h1>

          <p className={styles.heroSubtitle}>
            Discover our collection of sweet drinks, crafted with love and
            perfect for your cozy moments.
          </p>

          <Link to="/shop" className={styles.heroButton}>
            <ShoppingBag size={20} />
            Browse Drinks
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <Coffee size={28} />
          </div>
          <h3>Fresh Brewed</h3>
          <p>Every drink is made fresh with premium ingredients</p>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <Heart size={28} />
          </div>
          <h3>Made with Love</h3>
          <p>
            Each of our drinks are crafted with care and attention to detail
          </p>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <Sparkles size={28} />
          </div>
          <h3>Unique Designs</h3>
          <p>Exclusive drinks you won't find anywhere else</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
