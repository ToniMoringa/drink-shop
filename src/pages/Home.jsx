import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FeaturedProducts from '../components/FeaturedProducts';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img
            src="https://images.pexels.com/photos/13662665/pexels-photo-13662665.jpeg"
            alt="Pixel Brew Café - Cozy coffee atmosphere"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Cute Drinks for Pixel Hearts</h1>
          <p className={styles.heroSubtitle}>
            Discover our collection of adorable pixel-art drinks, crafted with
            love and perfect for your cozy moments.
          </p>
          <Link to="/shop" className={styles.heroButton}>
            Explore Our Menu
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Story Section */}
      <section className={`${styles.section} ${styles.story}`}>
        <div className={styles.container}>
          <div className={styles.storyContent}>
            <h2 className={styles.storyTitle}>Our Story</h2>
            <p className={styles.storyText}>
              Pixel Brew Café began with a simple idea: bring the warmth of
              handcrafted drinks together with the charm of pixel art. Every
              drink is made with care, using quality ingredients and a whole lot
              of love.
            </p>
            <Link to="/shop" className={styles.storyLink}>
              Learn More →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
