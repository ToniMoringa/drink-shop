import { useState, useEffect } from 'react';
import styles from './AnnouncementBar.module.css';

const messages = [
  'FREE SHIPPING & SAVE ON MATCHA WITH CODE MATCHA20',
  'NEW: Winter Spice Collection Now Available!',
  'Order before 2PM for same-day pickup',
];

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.announcementBar}>
      <div className={styles.container}>
        <p className={styles.message}>{messages[currentIndex]}</p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
