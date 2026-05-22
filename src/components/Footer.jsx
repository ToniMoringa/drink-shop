import { Instagram, Twitter, Facebook, Mail, Coffee } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerLogo}>
            <Coffee size={28} />
            Pixel Brew Café
          </h3>
          <p className={styles.footerTagline}>
            Crafting pixel-perfect drinks with love and creativity
          </p>
        </div>

        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <a href="/" className={styles.footerLink}>
            Home
          </a>
          <a href="/shop" className={styles.footerLink}>
            Shop
          </a>
          <a href="/admin" className={styles.footerLink}>
            Admin
          </a>
        </div>

        <div className={styles.footerSection}>
          <h4>Connect With Us</h4>
          <div className={styles.socialLinks}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="mailto:hello@pixelbrew.com"
              className={styles.socialLink}
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} Pixel Brew Café. Made with Love and
          pixels.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
