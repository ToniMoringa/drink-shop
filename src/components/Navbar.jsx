import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Settings } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/shop', icon: ShoppingBag, label: 'Shop' },
    { path: '/admin', icon: Settings, label: 'Admin Portal' },
  ];

  return (
    <nav className={styles.nav}>
      {navItems.map(({ path, icon: Icon, label }) => (
        <Link
          key={path}
          to={path}
          className={`${styles.link} ${location.pathname === path ? styles.active : ''}`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}