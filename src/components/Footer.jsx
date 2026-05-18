import { Link } from 'react-router-dom';
import {
  InstagramIcon,
  TikTokIcon,
  PinterestIcon,
  MailIcon,
} from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Newsletter Section */}
        <div className={styles.newsletter}>
          <h3 className={styles.newsletterTitle}>Never miss a drop!</h3>
          <p className={styles.newsletterText}>
            Get our latest news to your inbox
          </p>
          <form
            className={styles.newsletterForm}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.emailInput}
            />
            <button type="submit" className={styles.subscribeBtn}>
              Subscribe
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className={styles.linksGrid}>
          <div className={styles.linkColumn}>
            <h4>Shop</h4>
            <ul>
              <li>
                <Link to="/shop">All Drinks</Link>
              </li>
              <li>
                <Link to="/shop?category=hot">Hot Drinks</Link>
              </li>
              <li>
                <Link to="/shop?category=cold">Cold Drinks</Link>
              </li>
              <li>
                <Link to="/admin">Admin Portal</Link>
              </li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h4>Explore</h4>
            <ul>
              <li>
                <a href="#locations">Locations</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#stories">Our Stories</a>
              </li>
              <li>
                <a href="#recipes">Recipes</a>
              </li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h4>About</h4>
            <ul>
              <li>
                <a href="#story">Our Story</a>
              </li>
              <li>
                <a href="#coldbrew">Cold Brew</a>
              </li>
              <li>
                <a href="#sustainability">Sustainability</a>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#shipping">Shipping Info</a>
              </li>
              <li>
                <a href="#returns">Returns</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className={styles.bottomSection}>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Instagram" className={styles.socialLink}>
              <InstagramIcon size={20} />
            </a>
            <a href="#" aria-label="TikTok" className={styles.socialLink}>
              <TikTokIcon size={20} />
            </a>
            <a href="#" aria-label="Pinterest" className={styles.socialLink}>
              <PinterestIcon size={20} />
            </a>
          </div>

          <div className={styles.copyright}>
            <p>©2026 Pixel Brew Café</p>
            <div className={styles.legalLinks}>
              <a href="#terms">Terms & Conditions</a>
              <a href="#privacy">Privacy Policy</a>
            </div>
          </div>

          {/* Decorative Image */}
          <div className={styles.decorativeImage}>
            <div className={styles.imagePlaceholder}>
              <MailIcon size={24} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
