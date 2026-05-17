import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Settings, Coffee } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/shop', label: 'Shop', icon: ShoppingBag },
    { path: '/admin', label: 'Admin', icon: Settings },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <Coffee size={28} strokeWidth={2.5} />
          <span>Pixel Brew Café</span>
        </Link>

        <ul className={styles.navLinks}>
          {navItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={`${styles.navLink} ${location.pathname === path ? styles.active : ''}`}
              >
                <Icon size={18} strokeWidth={2} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
